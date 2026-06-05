import { Droplets, AlertTriangle, CheckCircle, Clock, Sparkles, XCircle, CheckCircle2 } from "lucide-react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const ResourceManagement = () => {
  const { t } = useSimpleLanguage();

  const beforeItems = [
    t("resourceMgmt.before1"),
    t("resourceMgmt.before2"),
    t("resourceMgmt.before3"),
    t("resourceMgmt.before4"),
  ];

  const afterItems = [
    t("resourceMgmt.after1"),
    t("resourceMgmt.after2"),
    t("resourceMgmt.after3"),
    t("resourceMgmt.after4"),
  ];

  const resources = [
    { label: "Nước — Lô A", used: 75, recommended: 60, unit: "m³", over: true },
    { label: "Phân NPK — Lô B", used: 45, recommended: 50, unit: "kg", over: false },
    { label: "Nước — Lô C", used: 30, recommended: 40, unit: "m³", over: false },
  ];

  const taskColumns = [
    {
      status: t("resourceMgmt.todoLabel"),
      color: "border-amber-400/30 bg-amber-400/5",
      icon: Clock,
      iconColor: "text-amber-500",
      tasks: [t("resourceMgmt.todo1"), t("resourceMgmt.todo2")],
    },
    {
      status: t("resourceMgmt.inProgressLabel"),
      color: "border-sky-400/30 bg-sky-400/5",
      icon: Droplets,
      iconColor: "text-sky-500",
      tasks: [t("resourceMgmt.inProgress1"), t("resourceMgmt.inProgress2")],
    },
    {
      status: t("resourceMgmt.doneLabel"),
      color: "border-primary/30 bg-primary/5",
      icon: CheckCircle,
      iconColor: "text-primary",
      tasks: [t("resourceMgmt.done1"), t("resourceMgmt.done2")],
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <Sparkles className="h-3 w-3" /> {t("resourceMgmt.badge")}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 leading-tight">
            {t("resourceMgmt.heroTitle")}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("resourceMgmt.heroHighlight")}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("resourceMgmt.heroDesc")}
          </p>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            {t("resourceMgmt.painTitle")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
              <p className="text-xs font-semibold uppercase text-destructive mb-4 tracking-wide">Before</p>
              <div className="space-y-3">
                {beforeItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-xs font-semibold uppercase text-primary mb-4 tracking-wide">After</p>
              <div className="space-y-3">
                {afterItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Monitor */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t("resourceMgmt.monitorTitle")}
          </h2>
          <div className="max-w-3xl mx-auto bg-card rounded-xl border border-border p-8 shadow-sm">
            <div className="space-y-6">
              {resources.map((r) => (
                <div key={r.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{r.label}</span>
                    <div className="flex items-center gap-2 text-xs">
                      {r.over && (
                        <span className="flex items-center gap-1 text-destructive">
                          <AlertTriangle size={12} /> {t("resourceMgmt.overThreshold")}
                        </span>
                      )}
                      <span className="text-muted-foreground">
                        {r.used}{r.unit} / {r.recommended}{r.unit} {t("resourceMgmt.recommended")}
                      </span>
                    </div>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        r.over
                          ? "bg-destructive"
                          : "bg-gradient-to-r from-primary to-secondary"
                      }`}
                      style={{ width: `${Math.min((r.used / r.recommended) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Task Board */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t("resourceMgmt.taskTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {taskColumns.map((col) => {
              const Icon = col.icon;
              return (
                <div key={col.status} className={`rounded-xl border p-5 ${col.color}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon size={16} className={col.iconColor} />
                    <h3 className="font-semibold text-sm text-foreground">{col.status}</h3>
                  </div>
                  <div className="space-y-3">
                    {col.tasks.map((task) => (
                      <div key={task} className="bg-card rounded-lg border border-border p-3">
                        <div className="flex items-start gap-2">
                          <Sparkles size={12} className="text-primary shrink-0 mt-0.5" />
                          <p className="text-xs text-foreground">{task}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourceManagement;
