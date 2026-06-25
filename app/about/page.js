import { Flame, Heart, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-72 mb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=1400&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/60 to-brand-bg" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <p className="text-brand-orange text-sm font-semibold uppercase tracking-widest mb-2">Our Story</p>
            <h1 className="font-display text-5xl font-bold text-brand-cream">About Medrano's</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-cream mb-5">
              Born from a backyard,<br />built on fire.
            </h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              In 2010, Carlos Medrano started grilling burgers in his backyard for neighbors in Queens, New York. 
              Word spread faster than the smoke. Within a year, he had a food truck. By 2015, the first brick-and-mortar Medrano's opened on Flame Street.
            </p>
            <p className="text-brand-muted leading-relaxed">
              Today, we serve thousands of customers but the philosophy remains exactly the same: 
              fresh beef, real fire, and no compromises.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden h-64">
            <img
              src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80"
              alt="Burger being grilled"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: Flame,
              title: 'The Flame',
              desc: 'Every burger is cooked over open flame — no exceptions. The grill gives a crust no flat-top can match.',
            },
            {
              icon: Heart,
              title: 'The Craft',
              desc: 'Our team trains for months before touching a patty. Speed matters, but never at the cost of quality.',
            },
            {
              icon: Award,
              title: 'The Standard',
              desc: "We've turned down investors who wanted to scale fast. We'd rather do one thing perfectly than many things adequately.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-brand-surface border border-brand-border rounded-2xl p-7">
              <Icon className="w-8 h-8 text-brand-orange mb-4" />
              <h3 className="text-brand-cream font-bold text-lg mb-2">{title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Team quote */}
        <div className="text-center bg-brand-surface border border-brand-border rounded-3xl p-12">
          <blockquote className="font-display text-2xl text-brand-cream italic leading-relaxed mb-6">
            "I never wanted a chain. I wanted a place where people taste the difference and remember it."
          </blockquote>
          <div className="text-brand-orange font-semibold">— Carlos Medrano, Founder</div>
        </div>
      </div>
    </div>
  )
}
