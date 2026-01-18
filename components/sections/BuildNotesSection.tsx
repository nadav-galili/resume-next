"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeSnippet } from "@/components/features/CodeSnippet";
import { cn } from "@/lib/utils";
import resumeData from "@/data/resume.json";
import { Code2, Zap, Rocket, Scale, CheckCircle2 } from "lucide-react";

const tabConfig = [
  {
    value: "architecture",
    label: "Architecture",
    icon: Code2,
  },
  {
    value: "performance",
    label: "Performance",
    icon: Zap,
  },
  {
    value: "deployment",
    label: "Deployment",
    icon: Rocket,
  },
  {
    value: "tradeoffs",
    label: "Tradeoffs",
    icon: Scale,
  },
];

// Example code snippets for architecture tab
const performanceCodeExample = `// Custom Hook with AbortController 
export function useLeagueStats(leagueId: string | undefined): UseLeagueStatsReturn {
   const { fetchWithAuth } = useAuth();
   const [league, setLeague] = React.useState<LeagueData | null>(null);
   const [stats, setStats] = React.useState<LeagueStats | null>(null);
   const [isLoading, setIsLoading] = React.useState(true);
   const [error, setError] = React.useState<string | null>(null);
   const [refreshing, setRefreshing] = React.useState(false);

   const loadLeagueData = React.useCallback(
      async (abortSignal?: AbortSignal) => {
         if (!leagueId || abortSignal?.aborted) return;

         try {
            setError(null);
            if (!refreshing && !abortSignal?.aborted) setIsLoading(true);

            const leagueResponse = await fetchWithAuth(
               "{BASE_URL}/api/leagues/{leagueId}",
               { signal: abortSignal }
            );

            if (abortSignal?.aborted) return;
            if (!leagueResponse.ok) throw new Error('Failed to fetch league details');

            const leagueData = await leagueResponse.json();
            if (abortSignal?.aborted) return;
            setLeague(leagueData.league);

            // ... fetch stats similarly
         } catch (err) {
            if (abortSignal?.aborted) return;
            const errorMessage = err instanceof Error ? err.message : 'Failed to load league data';
            setError(errorMessage);
            captureException(err as Error, { function: 'loadLeagueData', leagueId });
         } finally {
            if (!abortSignal?.aborted) {
               setIsLoading(false);
               setRefreshing(false);
            }
         }
      },
      [leagueId, fetchWithAuth, refreshing]
   );

   React.useEffect(() => {
      const abortController = new AbortController();
      loadLeagueData(abortController.signal);
      return () => abortController.abort(); // Cleanup on unmount
   }, [loadLeagueData]);

   // Memoize return object to prevent unnecessary re-renders in consumers
   return React.useMemo(
      () => ({ league, stats, isLoading, error, refreshing, loadLeagueData, handleRefresh }),
      [league, stats, isLoading, error, refreshing, loadLeagueData, handleRefresh]
   );
}`;

const architectureCodeExample = `// well-designed relational database schema with proper indexing and type inference.
export const games = pgTable(
   'games',
   {
      id: integer('id').generatedAlwaysAsIdentity().primaryKey(),
      leagueId: integer('league_id')
         .notNull()
         .references(() => leagues.id, { onDelete: 'cascade' }),
      createdBy: integer('created_by')
         .notNull()
         .references(() => users.id, { onDelete: 'cascade' }),
      buyIn: decimal('buy_in', { precision: 10, scale: 2 }).notNull(),
      status: gameStatusEnum('status').notNull().default('active'),
      startedAt: timestamp('started_at').defaultNow().notNull(),
      endedAt: timestamp('ended_at'),
   },
   (table) => ({
      leagueIdx: index('games_league_idx').on(table.leagueId),
      creatorIdx: index('games_creator_idx').on(table.createdBy),
      // Composite index for stats calculations
      leagueStatusEndedAtIdx: index('games_league_status_ended_at_idx').on(
         table.leagueId,
         table.status,
         table.endedAt
      ),
   })
);

export const gamesRelations = relations(games, ({ one, many }) => ({
   league: one(leagues, { fields: [games.leagueId], references: [leagues.id] }),
   creator: one(users, { fields: [games.createdBy], references: [users.id] }),
   players: many(gamePlayers),
   cashIns: many(cashIns),
}));

// Type inference from schema
export type Game = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;`;

export function BuildNotesSection() {
  const [activeTab, setActiveTab] = React.useState("architecture");
  const buildNotes = resumeData.indieProjects[0]?.buildNotes;

  if (!buildNotes) {
    return null;
  }

  return (
    <section
      id="build-notes"
      className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Build Notes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technical decisions, performance optimizations, and lessons learned
            from shipping Poker AI to production
          </p>
        </motion.div>

        {/* Tabs container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full">
            {/* Tabs list - horizontal scroll on mobile */}
            <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4">
              <TabsList className="w-full md:w-fit min-w-full md:min-w-0 grid grid-cols-4 md:inline-flex">
                {tabConfig.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                      <Icon className="size-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden text-xs">
                        {tab.label.slice(0, 4)}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Tab content with glass effect card */}
            <div className="relative">
              <div
                className={cn(
                  "rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm",
                  "shadow-xl p-6 md:p-8",
                  "min-h-[400px] md:min-h-[500px]"
                )}>
                {/* Architecture */}
                <TabsContent value="architecture" className="mt-0 space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Code2 className="size-5 text-primary" />
                        Architecture Decisions
                      </h3>
                      <ul className="space-y-3">
                        {buildNotes.architecture.map((note, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{note}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Code example */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">
                        Example: Custom React Hook Implementation
                      </h4>
                      <CodeSnippet
                        code={architectureCodeExample}
                        language="typescript"
                      />
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Performance */}
                <TabsContent value="performance" className="mt-0 space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Zap className="size-5 text-primary" />
                        Performance Optimizations
                      </h3>
                      <ul className="space-y-3">
                        {buildNotes.performance.map((note, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{note}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Code example */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">
                        Example: Optimized FlatList Rendering
                      </h4>
                      <CodeSnippet
                        code={performanceCodeExample}
                        language="typescript"
                      />
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Deployment */}
                <TabsContent value="deployment" className="mt-0 space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Rocket className="size-5 text-primary" />
                        Deployment Strategy
                      </h3>
                      <ul className="space-y-3">
                        {buildNotes.deployment.map((note, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{note}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Deployment workflow visualization */}
                    <div className="bg-muted/30 rounded-lg p-6 border border-border/30">
                      <h4 className="text-sm font-medium mb-4">
                        Deployment Workflow
                      </h4>
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                        <div className="flex flex-col items-center text-center">
                          <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                            <Code2 className="size-6 text-primary" />
                          </div>
                          <div className="font-medium">Code Push</div>
                          <div className="text-xs text-muted-foreground">
                            GitHub
                          </div>
                        </div>
                        <div className="hidden md:block text-muted-foreground">
                          →
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                            <Rocket className="size-6 text-primary" />
                          </div>
                          <div className="font-medium">EAS Build</div>
                          <div className="text-xs text-muted-foreground">
                            Cloud Build
                          </div>
                        </div>
                        <div className="hidden md:block text-muted-foreground">
                          →
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                            <Zap className="size-6 text-primary" />
                          </div>
                          <div className="font-medium">OTA Update</div>
                          <div className="text-xs text-muted-foreground">
                            Instant Deploy
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Tradeoffs */}
                <TabsContent value="tradeoffs" className="mt-0 space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Scale className="size-5 text-primary" />
                        Engineering Tradeoffs
                      </h3>
                      <div className="space-y-4">
                        {buildNotes.tradeoffs.map((note, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-muted/30 rounded-lg p-4 border border-border/30">
                            <div className="flex items-start gap-3">
                              <Scale className="size-5 text-primary mt-0.5 shrink-0" />
                              <p className="text-muted-foreground leading-relaxed">
                                {note}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tradeoff philosophy */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-6">
                      <h4 className="font-semibold mb-2 text-primary">
                        Tradeoff Philosophy
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Every technical decision involves tradeoffs. These
                        choices were made to optimize for shipping speed and
                        user experience while maintaining code quality. As an
                        indie developer, pragmatic decisions that enable faster
                        iteration often outweigh theoretical perfection.
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
