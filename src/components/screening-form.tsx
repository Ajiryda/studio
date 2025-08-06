"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { students, medications } from "@/lib/mock-data";

const screeningFormSchema = z.object({
  studentId: z.string().min(1, { message: "Please select a student." }),
  height: z.coerce.number().positive({ message: "Height must be positive." }),
  weight: z.coerce.number().positive({ message: "Weight must be positive." }),
  isFemale: z.enum(["yes", "no"], { required_error: "Please select an option." }),
  lastPeriodDate: z.string().optional(),
  eyeHealth: z.string().optional(),
  allergies: z.string().optional(),
  symptoms: z.string().min(1, { message: "Symptoms are required." }),
  medicationGiven: z.string().optional(),
});

type ScreeningFormValues = z.infer<typeof screeningFormSchema>;

export function ScreeningForm() {
  const { toast } = useToast();
  const [bmi, setBmi] = useState<number | null>(null);

  const form = useForm<ScreeningFormValues>({
    resolver: zodResolver(screeningFormSchema),
    defaultValues: {
      isFemale: "no",
      allergies: "",
      eyeHealth: "",
      symptoms: "",
      medicationGiven: "",
      lastPeriodDate: "",
    },
  });

  const height = form.watch("height");
  const weight = form.watch("weight");
  const isFemale = form.watch("isFemale");

  useEffect(() => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(calculatedBmi.toFixed(1)));
    } else {
      setBmi(null);
    }
  }, [height, weight]);

  function onSubmit(data: ScreeningFormValues) {
    console.log(data);
    toast({
      title: "Screening Saved",
      description: `Health screening for student has been successfully recorded.`,
      variant: 'default',
    });
    form.reset();
    setBmi(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-8 md:col-span-2">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                          {student.name} - {student.class}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 165" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 55" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>BMI</FormLabel>
                <FormControl>
                  <Input readOnly value={bmi ? bmi : "Enter height and weight"} />
                </FormControl>
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptoms / Reason for Visit</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the student's symptoms or reason for their visit..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-8">
            <FormField
              control={form.control}
              name="isFemale"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Is the student female?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isFemale === "yes" && (
              <FormField
                control={form.control}
                name="lastPeriodDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Period Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="eyeHealth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eye Health Notes</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Wears glasses, reads close" {...field} />
                  </FormControl>
                  <FormDescription>Note any observations about vision.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Known Allergies</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Peanuts, dust" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="medicationGiven"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medication Given (if any)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a medication" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {medications.map((med) => (
                    <SelectItem key={med.id} value={med.name}>
                      {med.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Screening</Button>
      </form>
    </Form>
  );
}
