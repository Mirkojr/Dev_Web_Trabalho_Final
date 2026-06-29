"use client";

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useAdminGuard } from "./useAdminGuard";
import { dashboardService } from "@/services/dashboard.service";
import type { DashboardMetrics } from "@/types/admin";
import AdminShell from "./AdminShell";
import AdminStatCard from "./AdminStatCard";
import {
  UsersIcon,
  RecipesIcon,
  CommentsIcon,
  InteractionsIcon,
} from "./AdminIcons";
import styles from "./DashboardView.module.css";

const numberFormat = new Intl.NumberFormat("pt-BR");

function percent(part: number, total: number): number {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function barStyle(pct: number): CSSProperties {
  return { width: `${pct}%` };
}

export default function DashboardView() {
  const { checking } = useAdminGuard();

  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(false);

    return dashboardService
      .getMetrics()
      .then((data) => setMetrics(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (checking) return;
    load();
  }, [checking, load]);

  if (checking) {
    return (
      <AdminShell active="dashboard">
        <p className={styles.placeholder}>Carregando…</p>
      </AdminShell>
    );
  }

  const recipeTotal = metrics?.recipes ?? 0;
  const interactionsTotal = metrics ? metrics.smashes + metrics.passes : 0;
  const pendingTotal = metrics
    ? metrics.pendingRecipes +
      metrics.pendingCategories +
      metrics.pendingIngredients
    : 0;

  return (
    <AdminShell active="dashboard">
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Painel administrativo</span>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>
              Visão geral de usuários, receitas e interações da plataforma.
            </p>
          </div>
          <button
            type="button"
            className={styles.refresh}
            onClick={() => load()}
            disabled={loading}
          >
            {loading ? "Atualizando…" : "Atualizar"}
          </button>
        </header>

        {error ? (
          <div className={styles.error}>
            Não foi possível carregar as métricas.{" "}
            <button
              type="button"
              onClick={() => load()}
              className={styles.retry}
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            <section className={styles.kpis}>
              <AdminStatCard
                label="Usuários"
                value={metrics?.users}
                loading={loading}
                icon={<UsersIcon />}
                accent="violet"
              />
              <AdminStatCard
                label="Receitas"
                value={metrics?.recipes}
                loading={loading}
                icon={<RecipesIcon />}
                accent="coral"
              />
              <AdminStatCard
                label="Comentários"
                value={metrics?.comments}
                loading={loading}
                icon={<CommentsIcon />}
                accent="pink"
              />
              <AdminStatCard
                label="Interações"
                value={interactionsTotal}
                loading={loading}
                icon={<InteractionsIcon />}
                accent="amber"
              />
            </section>

            <section className={styles.columns}>
              {/* Status das receitas */}
              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Status das receitas</h2>
                <div className={styles.segmentBar}>
                  <span
                    className={`${styles.segment} ${styles.segApproved}`}
                    style={barStyle(
                      percent(metrics?.approvedRecipes ?? 0, recipeTotal)
                    )}
                  />
                  <span
                    className={`${styles.segment} ${styles.segPending}`}
                    style={barStyle(
                      percent(metrics?.pendingRecipes ?? 0, recipeTotal)
                    )}
                  />
                  <span
                    className={`${styles.segment} ${styles.segRejected}`}
                    style={barStyle(
                      percent(metrics?.rejectedRecipes ?? 0, recipeTotal)
                    )}
                  />
                </div>
                <ul className={styles.legend}>
                  <li>
                    <span className={`${styles.dot} ${styles.segApproved}`} />
                    <span className={styles.legendLabel}>Aprovadas</span>
                    <span className={styles.legendValue}>
                      {numberFormat.format(metrics?.approvedRecipes ?? 0)} ·{" "}
                      {percent(metrics?.approvedRecipes ?? 0, recipeTotal)}%
                    </span>
                  </li>
                  <li>
                    <span className={`${styles.dot} ${styles.segPending}`} />
                    <span className={styles.legendLabel}>Pendentes</span>
                    <span className={styles.legendValue}>
                      {numberFormat.format(metrics?.pendingRecipes ?? 0)} ·{" "}
                      {percent(metrics?.pendingRecipes ?? 0, recipeTotal)}%
                    </span>
                  </li>
                  <li>
                    <span className={`${styles.dot} ${styles.segRejected}`} />
                    <span className={styles.legendLabel}>Rejeitadas</span>
                    <span className={styles.legendValue}>
                      {numberFormat.format(metrics?.rejectedRecipes ?? 0)} ·{" "}
                      {percent(metrics?.rejectedRecipes ?? 0, recipeTotal)}%
                    </span>
                  </li>
                </ul>
              </article>

              {/* Interações */}
              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Interações dos usuários</h2>
                <p className={styles.bigStat}>
                  {percent(metrics?.smashes ?? 0, interactionsTotal)}%
                  <span className={styles.bigStatLabel}>taxa de smash</span>
                </p>
                <div className={styles.segmentBar}>
                  <span
                    className={`${styles.segment} ${styles.segSmash}`}
                    style={barStyle(
                      percent(metrics?.smashes ?? 0, interactionsTotal)
                    )}
                  />
                  <span
                    className={`${styles.segment} ${styles.segPass}`}
                    style={barStyle(
                      percent(metrics?.passes ?? 0, interactionsTotal)
                    )}
                  />
                </div>
                <ul className={styles.legend}>
                  <li>
                    <span className={`${styles.dot} ${styles.segSmash}`} />
                    <span className={styles.legendLabel}>Smashes</span>
                    <span className={styles.legendValue}>
                      {numberFormat.format(metrics?.smashes ?? 0)}
                    </span>
                  </li>
                  <li>
                    <span className={`${styles.dot} ${styles.segPass}`} />
                    <span className={styles.legendLabel}>Passes</span>
                    <span className={styles.legendValue}>
                      {numberFormat.format(metrics?.passes ?? 0)}
                    </span>
                  </li>
                </ul>
              </article>
            </section>

            <section className={styles.columns}>
              {/* Moderação pendente */}
              <article className={styles.card}>
                <div className={styles.cardHead}>
                  <h2 className={styles.cardTitle}>Moderação pendente</h2>
                  <span className={styles.pendingPill}>
                    {numberFormat.format(pendingTotal)}
                  </span>
                </div>
                <ul className={styles.rows}>
                  <li className={styles.row}>
                    <span>Receitas</span>
                    <span className={styles.rowValue}>
                      {numberFormat.format(metrics?.pendingRecipes ?? 0)}
                    </span>
                  </li>
                  <li className={styles.row}>
                    <span>Categorias</span>
                    <span className={styles.rowValue}>
                      {numberFormat.format(metrics?.pendingCategories ?? 0)}
                    </span>
                  </li>
                  <li className={styles.row}>
                    <span>Ingredientes</span>
                    <span className={styles.rowValue}>
                      {numberFormat.format(metrics?.pendingIngredients ?? 0)}
                    </span>
                  </li>
                </ul>
              </article>

              {/* Catálogo */}
              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Catálogo</h2>
                <ul className={styles.rows}>
                  <li className={styles.row}>
                    <span>Categorias</span>
                    <span className={styles.rowValue}>
                      {numberFormat.format(metrics?.categories ?? 0)}
                      {metrics && metrics.pendingCategories > 0 ? (
                        <span className={styles.rowHint}>
                          {metrics.pendingCategories} pendentes
                        </span>
                      ) : null}
                    </span>
                  </li>
                  <li className={styles.row}>
                    <span>Ingredientes</span>
                    <span className={styles.rowValue}>
                      {numberFormat.format(metrics?.ingredients ?? 0)}
                      {metrics && metrics.pendingIngredients > 0 ? (
                        <span className={styles.rowHint}>
                          {metrics.pendingIngredients} pendentes
                        </span>
                      ) : null}
                    </span>
                  </li>
                </ul>
              </article>
            </section>
          </>
        )}
      </div>
    </AdminShell>
  );
}