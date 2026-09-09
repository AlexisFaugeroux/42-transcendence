/** Un utilisateur se désigne par n'importe laquelle de ses colonnes uniques :
 *  l'id (session courante), l'email (authentification) ou le handle (routes publiques). */
export type UniqueRef = { id: string } | { email: string } | { handle: string };

export interface FollowListOptions {
  skip?: number;
  take?: number;
  q?: string;
}
