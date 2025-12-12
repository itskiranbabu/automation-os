import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-bold text-xl">AutomationOS</span>
            </div>

            <nav className="flex items-center gap-6">
              <Link href="/workflows" className="text-slate-600 hover:text-slate-900">
                Workflows
              </Link>
              <Link href="/connections" className="text-slate-600 hover:text-slate-900">
                Connections
              </Link>
              <Link href="/templates" className="text-slate-600 hover:text-slate-900">
                Templates
              </Link>
              <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {session.user.user_metadata?.full_name || session.user.email}!
          </h1>
          <p className="text-slate-600">Here&apos;s what&apos;s happening with your automations</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/workflows/new"
            className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-1">Create Workflow</h3>
            <p className="text-sm text-slate-600">Build a new automation from scratch</p>
          </Link>

          <Link
            href="/templates"
            className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-1">Browse Templates</h3>
            <p className="text-sm text-slate-600">Start with pre-built workflows</p>
          </Link>

          <Link
            href="/connections"
            className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-1">Connect Apps</h3>
            <p className="text-sm text-slate-600">Link your favorite services</p>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">Total Workflows</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">Active Workflows</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">Total Runs</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">Success Rate</p>
            <p className="text-3xl font-bold">-</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="text-center py-12 text-slate-500">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p>No workflows yet</p>
            <p className="text-sm mt-1">Create your first workflow to get started</p>
          </div>
        </div>
      </main>
    </div>
  );
}
