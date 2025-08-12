"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FormData } from "@/types";
import MLSSearchForm from "./MLSField";
import TransactionForm from "./transactionform";
import RealEstateForm from "./demofields";
import ContactsInput from "./ContactField";
import SignersAndOtherParties from "./AddSigners";
import FormsAndDocuments from "./AddFormDocument";
import ChecklistSettings from "./AddChecklist";
import DocumentFormSelector from "./SelectForm";

const steps = [
  { id: "personal", title: "MLS" },
  { id: "professional", title: "Professional" },
  { id: "goals", title: "Website Goals" },
  { id: "design", title: "Design" },
  { id: "budget", title: "Budget" },
  { id: "requirements", title: "Requirements" },
];


const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    profession: "",
    experience: "",
    industry: "",
    primaryGoal: "",
    targetAudience: "",
    contentTypes: [],
    colorPreference: "",
    stylePreference: "",
    inspirations: "",
    budget: "",
    timeline: "",
    features: [],
    additionalInfo: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData((prev) => {
      const features = [...prev.features];
      if (features.includes(feature)) {
        return { ...prev, features: features.filter((f) => f !== feature) };
      } else {
        return { ...prev, features: [...features, feature] };
      }
    });
  };

  const toggleContentType = (type: string) => {
    setFormData((prev) => {
      const types = [...prev.contentTypes];
      if (types.includes(type)) {
        return { ...prev, contentTypes: types.filter((t) => t !== type) };
      } else {
        return { ...prev, contentTypes: [...types, type] };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Form submitted successfully!");
      setIsSubmitting(false);
    }, 1500);
  };

  // Check if step is valid for next button
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== "" && formData.email.trim() !== "";
      case 1:
        return formData.profession.trim() !== "" && formData.industry !== "";
      case 2:
        return formData.primaryGoal !== "";
      case 3:
        return formData.stylePreference !== "";
      case 4:
        return formData.budget !== "" && formData.timeline !== "";
      default:
        return true;
    }
  };

  const preventDefault = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full  mx-auto py-8 my-4">
      {/* Progress indicator */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              {/* <motion.div
                className={cn(
                  "w-4 h-4 rounded-full cursor-pointer transition-colors duration-300",
                  index < currentStep
                    ? "bg-primary"
                    : index === currentStep
                      ? "bg-primary ring-4 ring-primary/20"
                      : "bg-muted",
                )}
                onClick={() => {
                  // Only allow going back or to completed steps
                  if (index <= currentStep) {
                    setCurrentStep(index);
                  }
                }}
                whileTap={{ scale: 0.95 }}
              /> */}
              {/* <motion.span
                className={cn(
                  "text-xs mt-1.5 hidden sm:block",
                  index === currentStep
                    ? "text-primary font-medium"
                    : "text-muted-foreground",
                )}
              >
                {step.title}
              </motion.span> */}
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className=" rounded-lg overflow-hidden">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                {/* Step 1: Personal Info */}
                {currentStep === 0 && (
                  <>
                   <MLSSearchForm/>
                  </>
                )}

                {/* Step 2: Professional Background */}
                {currentStep === 1 && (
                  <>
                   {/* <TransactionForm/> */}
                   <RealEstateForm/>
                  </>
                )}

                {/* Step 3: Website Goals */}
                {currentStep === 2 && (
                  <>
                   <ContactsInput/>
                  </>
                )}

                {/* Step 4: Design Preferences */}
                {currentStep === 3 && (
                  <>
                  <h1>screen</h1>
                  {/* <DocumentFormSelector/> */}
                  {/* <SignersAndOtherParties/> */}
                  </>
                )}

                {/* Step 5: Budget & Timeline */}
                {currentStep === 4 && (
                  <>
                  <ChecklistSettings/>
                   {/* <FormsAndDocuments/> */}
                  </>
                )}

                {/* Step 6: Additional Requirements */}
                {currentStep === 5 && (
                  <>
                    <CardHeader>
                      <CardTitle>Additional Requirements</CardTitle>
                      <CardDescription>
                        Any other specific needs for your website?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Which features do you need?</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            "Contact Form",
                            "Blog/News",
                            "E-commerce",
                            "User Accounts",
                            "Search Functionality",
                            "Social Media Integration",
                            "Newsletter Signup",
                            "Analytics",
                          ].map((feature, index) => (
                            <motion.div
                              key={feature}
                              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                  delay: 0.05 * index,
                                  duration: 0.3,
                                },
                              }}
                              onClick={() =>
                                toggleFeature(feature.toLowerCase())
                              }
                            >
                              <Checkbox
                                id={`feature-${feature}`}
                                checked={formData.features.includes(
                                  feature.toLowerCase(),
                                )}
                                onCheckedChange={() =>
                                  toggleFeature(feature.toLowerCase())
                                }
                              />
                              <Label
                                htmlFor={`feature-${feature}`}
                                className="cursor-pointer w-full"
                              >
                                {feature}
                              </Label>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="additionalInfo">
                          Anything else we should know?
                        </Label>
                        <Textarea
                          id="additionalInfo"
                          placeholder="Any additional requirements or information"
                          value={formData.additionalInfo}
                          onChange={(e) =>
                            updateFormData("additionalInfo", e.target.value)
                          }
                          className="min-h-[80px] transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </motion.div>
                    </CardContent>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex justify-between pt-6 pb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1 transition-all duration-300 cursor-pointer rounded-2xl"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button

                  type="button"
                  onClick={
                    currentStep === steps.length - 1 ? handleSubmit : nextStep
                  }
                //   disabled={!isStepValid() || isSubmitting}
                  className={cn(
                    "flex items-center gap-1 cursor-pointer transition-all duration-300 rounded-2xl",
                    currentStep === steps.length - 1 ? "" : "",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      {currentStep === steps.length - 1 ? "Submit" : "Next"}
                      {currentStep === steps.length - 1 ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </div>
        </div>
      </motion.div>

      {/* Step indicator */}
      {/* <motion.div
        className="mt-4 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </motion.div> */}
    </div>
  );
};

export default OnboardingForm;
