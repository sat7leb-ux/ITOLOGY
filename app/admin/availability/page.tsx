"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Clock, Calendar, User, X, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface Staff {
  id: string;
  display_name: string;
  timezone: string;
}

interface Schedule {
  id: string;
  staff_id: string;
  name: string;
  timezone: string;
  is_default: boolean;
}

interface AvailabilityRule {
  id: string;
  schedule_id: string;
  weekday: number;
  start_time: string;
  end_time: string;
}

interface AvailabilityOverride {
  id: string;
  schedule_id: string;
  date: string;
  is_closed: boolean;
  start_time: string | null;
  end_time: string | null;
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const inputStyle = "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-jade focus:outline-none focus:ring-2 focus:ring-jade/20";
const labelStyle = "block text-sm font-medium text-text-primary mb-1.5";

export default function AdminAvailability() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [overrides, setOverrides] = useState<AvailabilityOverride[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [scheduleForm, setScheduleForm] = useState({ staff_id: "", name: "", timezone: "Asia/Beirut" });
  const [ruleForm, setRuleForm] = useState({ weekday: 1, start_time: "09:00", end_time: "17:00" });
  const sb = createClient();

  const fetchData = useCallback(async () => {
    const [staffRes, schedulesRes, rulesRes, overridesRes] = await Promise.all([
      sb.from("meridian_staff").select("id, display_name, timezone").eq("is_active", true).order("display_name"),
      sb.from("meridian_schedules").select("*").order("name"),
      sb.from("meridian_availability_rules").select("*").order("weekday"),
      sb.from("meridian_availability_overrides").select("*").order("date"),
    ]);
    setStaff((staffRes.data ?? []) as Staff[]);
    setSchedules((schedulesRes.data ?? []) as Schedule[]);
    setRules((rulesRes.data ?? []) as AvailabilityRule[]);
    setOverrides((overridesRes.data ?? []) as AvailabilityOverride[]);
    if (!selectedSchedule && schedulesRes.data?.length) {
      setSelectedSchedule((schedulesRes.data as Schedule[])[0].id);
    }
  }, [sb, selectedSchedule]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function saveSchedule() {
    const payload = {
      ...scheduleForm,
      id: editingSchedule?.id || crypto.randomUUID(),
      is_default: editingSchedule?.is_default || false,
      updated_at: new Date().toISOString(),
    };
    if (!editingSchedule) (payload as any).created_at = new Date().toISOString();
    await sb.from("meridian_schedules").upsert(payload);
    setShowScheduleForm(false);
    setEditingSchedule(null);
    setScheduleForm({ staff_id: "", name: "", timezone: "Asia/Beirut" });
    fetchData();
  }

  async function deleteSchedule(id: string) {
    if (!confirm("Delete this schedule and all its rules?")) return;
    await sb.from("meridian_availability_rules").delete().eq("schedule_id", id);
    await sb.from("meridian_schedules").delete().eq("id", id);
    setSelectedSchedule(null);
    fetchData();
  }

  async function addRule() {
    if (!selectedSchedule) return;
    await sb.from("meridian_availability_rules").insert({
      schedule_id: selectedSchedule,
      weekday: ruleForm.weekday,
      start_time: ruleForm.start_time,
      end_time: ruleForm.end_time,
    });
    setShowRuleForm(false);
    setRuleForm({ weekday: 1, start_time: "09:00", end_time: "17:00" });
    fetchData();
  }

  async function deleteRule(id: string) {
    await sb.from("meridian_availability_rules").delete().eq("id", id);
    fetchData();
  }

  const scheduleRules = rules.filter((r) => r.schedule_id === selectedSchedule);
  const scheduleOverrides = overrides.filter((o) => o.schedule_id === selectedSchedule);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Availability</h1>
          <p className="mt-1 text-sm text-text-muted">Set working hours and overrides for staff</p>
        </div>
        <button
          onClick={() => { setEditingSchedule(null); setScheduleForm({ staff_id: staff[0]?.id || "", name: "", timezone: "Asia/Beirut" }); setShowScheduleForm(true); }}
          className="inline-flex items-center gap-2 rounded-md bg-jade px-4 py-2 text-sm font-semibold text-white hover:bg-jade-light transition-colors"
        >
          <Plus className="h-4 w-4" /> New schedule
        </button>
      </div>

      {/* Schedule selector */}
      {schedules.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {schedules.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSchedule(s.id)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium border transition-colors",
                selectedSchedule === s.id
                  ? "bg-jade text-white border-jade"
                  : "bg-white text-text-primary border-line hover:border-jade/30"
              )}
            >
              {s.name || "Unnamed"}
              {s.is_default && <span className="ml-1 text-xs">★</span>}
            </button>
          ))}
        </div>
      )}

      {/* Schedule form modal */}
      {showScheduleForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-float p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg">{editingSchedule ? "Edit schedule" : "New schedule"}</h2>
              <button onClick={() => setShowScheduleForm(false)} className="p-1 rounded-md hover:bg-paper"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelStyle}>Name</label>
                <input className={inputStyle} value={scheduleForm.name} onChange={(e) => setScheduleForm({ ...scheduleForm, name: e.target.value })} placeholder="Default schedule" />
              </div>
              <div>
                <label className={labelStyle}>Staff Member</label>
                <select className={inputStyle} value={scheduleForm.staff_id} onChange={(e) => setScheduleForm({ ...scheduleForm, staff_id: e.target.value })}>
                  <option value="">Select staff…</option>
                  {staff.map((s) => (
                    <option key={s.id} value={s.id}>{s.display_name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelStyle}>Timezone</label>
                <select className={inputStyle} value={scheduleForm.timezone} onChange={(e) => setScheduleForm({ ...scheduleForm, timezone: e.target.value })}>
                  <option value="Asia/Beirut">Asia/Beirut</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <button onClick={saveSchedule} className="w-full rounded-md bg-jade px-4 py-2.5 text-sm font-semibold text-white hover:bg-jade-light">
                {editingSchedule ? "Save changes" : "Create schedule"}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedSchedule ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Rules */}
          <div className="rounded-xl border border-line bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold flex items-center gap-2"><Clock className="h-5 w-5 text-jade" /> Working hours</h2>
              <button
                onClick={() => setShowRuleForm(true)}
                className="inline-flex items-center gap-1 rounded-md bg-jade/10 px-3 py-1.5 text-sm font-medium text-jade hover:bg-jade/20 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> Add rule
              </button>
            </div>

            {/* Rule form */}
            {showRuleForm && (
              <div className="mb-4 rounded-lg border border-jade/20 bg-jade/5 p-4">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className={labelStyle}>Day</label>
                    <select className={inputStyle} value={ruleForm.weekday} onChange={(e) => setRuleForm({ ...ruleForm, weekday: Number(e.target.value) })}>
                      {WEEKDAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>Start</label>
                    <input type="time" className={inputStyle} value={ruleForm.start_time} onChange={(e) => setRuleForm({ ...ruleForm, start_time: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelStyle}>End</label>
                    <input type="time" className={inputStyle} value={ruleForm.end_time} onChange={(e) => setRuleForm({ ...ruleForm, end_time: e.target.value })} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={addRule} className="rounded-md bg-jade px-3 py-1.5 text-sm font-medium text-white hover:bg-jade-light">Add rule</button>
                  <button onClick={() => setShowRuleForm(false)} className="rounded-md border border-line px-3 py-1.5 text-sm">Cancel</button>
                </div>
              </div>
            )}

            {scheduleRules.length === 0 ? (
              <p className="text-sm text-text-muted">No rules yet. Add working hours!</p>
            ) : (
              <div className="space-y-2">
                {scheduleRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
                    <span className="text-sm">
                      <span className="font-medium">{WEEKDAYS[rule.weekday]}</span>
                      <span className="text-text-muted ml-2 tabular">{rule.start_time} – {rule.end_time}</span>
                    </span>
                    <button onClick={() => deleteRule(rule.id)} className="p-1 rounded hover:bg-paper text-text-muted hover:text-stop">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Overrides */}
          <div className="rounded-xl border border-line bg-white p-5">
            <h2 className="font-display font-semibold flex items-center gap-2 mb-4"><Calendar className="h-5 w-5 text-jade" /> Overrides</h2>
            <p className="text-sm text-text-muted mb-4">Holidays, vacation days, or special hours.</p>
            {scheduleOverrides.length === 0 ? (
              <p className="text-sm text-text-muted">No overrides yet.</p>
            ) : (
              <div className="space-y-2">
                {scheduleOverrides.map((o) => (
                  <div key={o.id} className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
                    <span className="text-sm">
                      <span className="font-medium">{o.date}</span>
                      <span className="text-text-muted ml-2">{o.is_closed ? "Closed" : `${o.start_time} – ${o.end_time}`}</span>
                    </span>
                    <button onClick={async () => { await sb.from("meridian_availability_overrides").delete().eq("id", o.id); fetchData(); }} className="p-1 rounded hover:bg-paper text-text-muted hover:text-stop">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-text-muted">
          <Clock className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>Create a schedule to set working hours</p>
        </div>
      )}
    </div>
  );
}
