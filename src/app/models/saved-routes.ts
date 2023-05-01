import { Building } from "./building";

export interface SavedRoutes
{
  userId: string,
  routeName: string,
  route: Building[]
}
