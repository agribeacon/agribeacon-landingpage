"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, CheckCircle, AlertCircle } from "lucide-react";

export function SupportSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      // Discord webhook URL
      const webhookUrl =
        "https://discord.com/api/webhooks/1412359402849177620/piAjfZGXyex24tfH9uWkeD-q3qXanGkU4Vy6H5K1_G9wiQ3Qthi6YLwG_34VCrdHYgGX";

      // Tạo tin nhắn đơn giản cho Discord
      const discordMessage = {
        username: "AgriBeacon Support Bot",
        content: `✅ AGRIBEACON SUPPORT REQUEST
        👤 Name: ${formData.name}
        📧 Email: ${formData.email}
        ❓ Question: ${formData.question}
        ⏰ Time: ${new Date().toLocaleString("vi-VN")}`,
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordMessage),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setIsOpen(false);
          setFormData({ name: "", email: "", question: "" });
        }, 3000);
      } else {
        throw new Error("Failed to send to Discord");
      }
    } catch (error) {
      console.error("Error sending to Discord:", error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className="bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 dark:from-emerald-950 dark:via-green-950 dark:to-lime-950">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 flex items-center justify-center gap-3">
          <MessageCircle className="h-10 w-10 text-emerald-600" />
          Need Help?
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-green-600 mx-auto rounded-full mb-8"></div>

        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Have questions or need support? We're here to help you get the most
            out of AgriBeacon.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-12 py-6 text-xl font-bold"
            >
              Submit Question
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 border-green-200 dark:border-green-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-emerald-600" />
                Submit Question
              </DialogTitle>
            </DialogHeader>

            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Message sent successfully! 🎉
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Thank you for contacting us! We will respond as soon as
                  possible.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Your message has been sent to our Discord support channel.
                </p>
              </div>
            ) : submitError ? (
              <div className="text-center py-8">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  An error occurred! 😔
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Unable to send message. Please check your internet connection
                  and try again.
                </p>
                <Button
                  onClick={() => setSubmitError(false)}
                  className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-green-200 dark:border-green-800 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-green-200 dark:border-green-800 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="question"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Your Question *
                  </Label>
                  <Textarea
                    id="question"
                    name="question"
                    required
                    value={formData.question}
                    onChange={handleInputChange}
                    className="min-h-[120px] border-green-200 dark:border-green-800 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Please describe your question or issue in detail..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit
                    </>
                  )}
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Section>
  );
}
