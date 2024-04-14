import { trpc } from "@/utils";

export function Config() {
  return (
    <div>
      <h1 className="font-sans">Config</h1>
      <h2>General</h2>
      <h2>Roles</h2>
      <h2>channels</h2>
      <h2>members</h2>
    </div>
  );
}

async function getRoles() {
  const test = await trpc.snowflake.getRoles.query();
  console.log(test);
}
