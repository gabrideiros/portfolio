import { Code, Database, Cpu } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  SiJavascript,
  SiTypescript,
  SiKotlin,
  SiMysql,
  SiMongodb,
  SiSqlite,
  SiGithub,
  SiNodedotjs,
} from "@icons-pack/react-simple-icons";

const skills = [
  {
    category: "Programming Languages",
    icon: <Code className="h-5 w-5 text-purple-400" />,
    items: [
      {
        name: "Java",
        icon: <img src="./java.svg" alt="Java" className="h-6 w-6" />,
      },
      {
        name: "JavaScript",
        icon: <SiJavascript color="default" className="h-5 w-5" />,
      },
      {
        name: "TypeScript",
        icon: <SiTypescript color="default" className="h-5 w-5" />,
      },
      {
        name: "Kotlin",
        icon: <SiKotlin color="default" className="h-5 w-5" />,
      },
      {
        name: "Node",
        icon: <SiNodedotjs color="default" className="h-5 w-5" />,
      },
    ],
  },
  {
    category: "Databases",
    icon: <Database className="h-5 w-5 text-purple-400" />,
    items: [
      { name: "MySQL", icon: <SiMysql color="default" className="h-6 w-6" /> },
      {
        name: "MongoDB",
        icon: <SiMongodb color="default" className="h-5 w-5" />,
      },
      {
        name: "SQLite",
        icon: <SiSqlite color="default" className="h-5 w-5" />,
      },
    ],
  },
  {
    category: "Tools & Technologies",
    icon: <Cpu className="h-5 w-5 text-purple-400" />,
    items: [
      { name: "GitHub", icon: <SiGithub className="h-5 w-5 " /> },
      {
        name: "Visual Studio Code",
        icon: <img src="./vscode.svg" alt="Java" className="h-5 w-5" />,
      },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl text-left text-white">
          Skills
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skillCategory, index) => (
            <Card
              key={index}
              className="border border-purple-900/10 bg-transparent hover:shadow-lg hover:shadow-purple-900/20 transition-shadow"
            >
              <CardHeader className="flex flex-row items-center space-y-0 space-x-3 pb-4 border-b border-purple-900/10">
                {skillCategory.icon}
                <CardTitle className="text-white text-lg">
                  {skillCategory.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {skillCategory.items.map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/10 hover:bg-purple-900/20 transition-colors"
                    >
                      {skill.icon}
                      <span className="text-purple-200">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
