import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ElementType } from "react";

export interface UtilityItem {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
  iconActiveColors: string;
  iconInactiveColors: string;
  bulletColorActive: string;
  bulletColorInactive: string;
  features: string[];
  href: string;
  isComingSoon: boolean;
}

export function UtilityCard({ util }: { util: UtilityItem }) {
  const Icon = util.icon;
  return (
    <Card
      className={`flex flex-col h-full border-slate-200 dark:border-slate-800 ${
        util.isComingSoon
          ? "bg-slate-50/50 dark:bg-slate-900/50 relative overflow-hidden"
          : "hover:shadow-lg transition-shadow dark:bg-slate-900"
      }`}
    >
      {util.isComingSoon && (
        <div className="absolute top-4 right-4 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          Coming Soon
        </div>
      )}
      <CardHeader>
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${
            util.isComingSoon
              ? `${util.iconInactiveColors} opacity-70`
              : util.iconActiveColors
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <CardTitle
          className={`text-xl ${
            util.isComingSoon ? "text-slate-700 dark:text-slate-300" : ""
          }`}
        >
          {util.title}
        </CardTitle>
        <CardDescription
          className={`text-sm ${
            util.isComingSoon ? "dark:text-slate-500" : "dark:text-slate-400"
          }`}
        >
          {util.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul
          className={`text-sm space-y-2 ${
            util.isComingSoon
              ? "text-slate-400 dark:text-slate-600"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {util.features.map((feature, featureIdx) => (
            <li key={featureIdx} className="flex items-center">
              <div
                className={`w-1.5 h-1.5 rounded-full mr-2 ${
                  util.isComingSoon
                    ? util.bulletColorInactive
                    : util.bulletColorActive
                }`}
              />{" "}
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {util.isComingSoon ? (
          <Button
            variant="outline"
            className="w-full text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-800 cursor-not-allowed hidden"
            disabled
          >
            Coming Soon
          </Button>
        ) : (
          <Link href={util.href} className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Open Utility <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
