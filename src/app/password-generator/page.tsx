"use client";

import { Key } from "@phosphor-icons/react";
import PasswordGenerator from "@/components/password-generator/password-generator";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function PasswordGeneratorPage() {
  return (
    <DashboardSidebar>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-cyan-500/20 text-cyan-600 dark:bg-cyan-500/30 dark:text-cyan-400 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5" weight="fill" />
              </div>
              <h1 className="text-3xl font-bold">PassGen Secure</h1>
            </div>
            <p className="text-muted-foreground">
              Generate cryptographically strong passwords. 100% client-side, never transmitted.
            </p>
          </div>

          <div className="mt-8">
            <PasswordGenerator />
          </div>
        </div>
      </div>
    </DashboardSidebar>
  );
}
