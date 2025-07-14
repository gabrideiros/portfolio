import { Code2, Gamepad2, Coffee } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              About Me
            </h2>

            <div className="p-0">
              <p className="text-lg text-purple-200">
                Passionate about Minecraft and game development since childhood,
                I've turned my hobby into professional skills by creating
                amazing addons for the community.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-purple-900/10 bg-purple-900/10 hover:bg-purple-900/20 transition-colors p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/50">
                    <Code2 className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">
                      +30 Addons Created
                    </h4>
                    <p className="text-sm text-purple-300">
                      Ranging from small modifications to complex systems
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-purple-900/10 bg-purple-900/10 hover:bg-purple-900/20 transition-colors p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-900/50">
                    <Gamepad2 className="h-6 w-6 text-pink-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">
                      +6 Years Experience
                    </h4>
                    <p className="text-sm text-purple-300">
                      Creating content for Minecraft
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-150 md:h-150 flex flex-col items-center">
              <img
                src="./working.png"
                alt="My Character"
                className="h-full w-full object-contain"
              />
              <div className="flex items-center gap-2 mt-2">
                <Coffee className="h-4 w-4 text-amber-400" />
                <span className="text-xs text-purple-200">
                  Fueled by coffee and creativity
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
