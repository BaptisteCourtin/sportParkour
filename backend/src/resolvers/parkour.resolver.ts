import { Arg, Mutation, Query, Resolver } from "type-graphql";
import ParkourEntity from "../entities/parkour.entity";
import ParkourService from "../services/parkour.service";

@Resolver()
export default class ParkourResolver {
  @Query(() => ParkourEntity)
  async getParkour(@Arg("id") id: number) {
    const ParkourEntity = await new ParkourService().get(id);
    return ParkourEntity;
  }
}
