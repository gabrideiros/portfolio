"use client";

import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useRef, useState } from "react";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(formRef.current!);

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/gabriel12082004@outlook.com",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (res.ok) {
        setStatus("success");
        setMessage("Message sent successfully!");
        formRef.current?.reset();
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Connection error. Please check your network.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Let's Work Together
          </h2>

          <Card className="border border-purple-900/10 bg-transparent p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Contact Me</h3>
                <p className="text-purple-200">
                  Interested in a custom addon? Have a project in mind? Send me
                  a message and let's talk about how I can help!
                </p>

                <div className="space-y-3 pt-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-purple-900/10 hover:bg-purple-900/20 text-white"
                    asChild
                  >
                    <a href="mailto:gabrideirosjogos@gmail.com">
                      <Mail className="mr-2 h-4 w-4 text-purple-400" />
                      gabrideirosjogos@gmail.com
                    </a>
                  </Button>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-transparent border-purple-900/10 hover:bg-purple-900/20"
                      asChild
                    >
                      <a href="#" target="_blank">
                        <Github className="h-4 w-4 text-purple-400" />
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-transparent border-purple-900/10 hover:bg-purple-900/20"
                      asChild
                    >
                      <a href="#" target="_blank">
                        <Linkedin className="h-4 w-4 text-purple-400" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-purple-200"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      className="bg-transparent border-purple-900/10 text-white placeholder-purple-400/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-purple-200"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-transparent border-purple-900/10 text-white placeholder-purple-400/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-purple-200"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What do you want to talk about?"
                    className="bg-transparent border-purple-900/10 text-white placeholder-purple-400/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-purple-200"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe your project or question..."
                    rows={5}
                    className="bg-transparent border-purple-900/10 text-white placeholder-purple-400/50"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Send Message
                </Button>

                {message && (
                  <p
                    className={`text-sm pt-2 ${
                      status === "success" ? "text-purple-200" : "text-red-400"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
