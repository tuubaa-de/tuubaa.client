"use client";
import { trpc } from "@/app/_trpc/client";
import { Skeleton } from "../ui/skeleton";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "tuubaa.server";
import React from "react";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  Command,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";

export default function Config() {
  const role = trpc.snowflake.roles.useQuery();

  if (!role.data || role.isLoading) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  return (
    <div>
      <h3>Roles</h3>
      <table>
        <tbody>
          {Object.entries(role.data).map(([key, value]) => (
            <ConfigRow roleName={key} roleData={value} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface ConfigRowProps {
  roleName: string;
  roleData: {
    label: string;
    id: string;
    color: number;
  } | null;
}

function ConfigRow(props: ConfigRowProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const allRoles = trpc.snowflake.allRole.useQuery();

  // console.log("data", allRoles.data);
  if (!allRoles.data || allRoles.isLoading) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  return (
    <tr>
      <td className="pr-4">
        <div className="flex items-center space-x-4">
          <p className="text-muted-foreground">
            {props.roleName[0].toUpperCase() + props.roleName.slice(1)}
          </p>
        </div>
      </td>
      <td>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {!value ? (
                <div className="font-light italic"> Select Role ... </div>
              ) : (
                allRoles.data.find((role) => role.id === value)?.label
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandList>
                {allRoles.data?.map((role) => (
                  <CommandItem
                    key={role.id + role.label}
                    value={role.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <div className="block">
                      <div className="text-base">{role.label}</div>
                      <div className="text-xs">{role.id}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
}
