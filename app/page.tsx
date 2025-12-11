import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-xl">AutomationOS</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-slate-600 hover:text-slate-900">
              Features
            </Link>
            <Link href="#templates" className="text-slate-600 hover:text-slate-900">
              Templates
            </Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-900">
              Pricing
            </Link>
            <Link href="/docs" className="text-slate-600 hover:text-slate-900">
              Docs
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-slate-600 hover:text-slate-900"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            🚀 AI-First Automation Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Build Automations with Natural Language
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Describe what you want in plain English. Our AI builds the workflow for you.
            Connect 200+ apps without writing code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
            >
              Start Building Free
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-slate-50 font-medium text-lg border border-slate-200"
            >
              Watch Demo
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why AutomationOS?</h2>
          <p className="text-xl text-slate-600">
            The most powerful automation platform, made simple
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
            <p className="text-slate-600">
              Describe workflows in plain English. AI generates the automation for you.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-slate-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Visual Editor</h3>
            <p className="text-slate-600">
              Drag-and-drop interface with branching, loops, and custom code.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-slate-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔌</span>
            </div>
            <h3 className="text-xl font-bold mb-2">200+ Integrations</h3>
            <p className="text-slate-600">
              Connect Gmail, Slack, Shopify, Stripe, and hundreds more apps.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-slate-200">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Durable Execution</h3>
            <p className="text-slate-600">
              Guaranteed workflow completion with automatic retries and error handling.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-slate-200">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Enterprise Ready</h3>
            <p className="text-slate-600">
              Multi-tenancy, RBAC, audit logs, and compliance-friendly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-slate-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🌐</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Self-Hostable</h3>
            <p className="text-slate-600">
              Deploy on your infrastructure or use our cloud. You choose.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Automate Everything?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of teams building the future of automation
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-slate-50 font-medium text-lg"
          >
            Start Building Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="font-bold text-xl">AutomationOS</span>
              </div>
              <p className="text-slate-600 text-sm">
                The AI-first automation platform for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#templates">Templates</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-slate-600 text-sm">
            <p>© 2025 AutomationOS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}