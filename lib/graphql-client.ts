import { generateClient } from "aws-amplify/api";
import { data } from "@/amplify/data/resource";

export const client = generateClient<typeof data>();
