import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, Search } from "lucide-react";
import { FormField, Input, Select } from "@/components/common/Field";
import Button from "@/components/common/Button";
import { DIVISIONS, BACKGROUNDS } from "@/utils/constants";
import { toast } from "sonner";

export function QuickSearch() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sscGpa: "",
      hscGpa: "",
      background: "",
      minBudget: "",
      maxBudget: "",
      division: "",
    },
  });

  const onSubmit = (data) => {
    const max = Number(data.maxBudget);

    if (data.minBudget !== "" && data.minBudget != null) {
      const min = Number(data.minBudget);
      if (min > max) {
        toast.error("Min Budget cannot be greater than Max Budget!");
        return;
      }
    }

    const params = new URLSearchParams();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== "" && v != null) params.set(k, v);
    });
    navigate(`/find?${params.toString()}`);
  };

  const onError = (errs) => {
    if (errs.background && errs.maxBudget) {
      toast.error("Please select your Background and enter Max Budget!");
    } else if (errs.background) {
      toast.error(
        "Please select your Background (Science, Commerce, or Arts)!",
      );
    } else if (errs.maxBudget) {
      toast.error("Please enter your Max Budget!");
    } else {
      toast.error("Please check your input values!");
    }
  };

  return (
    <section className="container-px -mt-6 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="card-base p-5 shadow-lift sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <SlidersHorizontal className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-semibold text-content">
                Quick University Search
              </h2>
              <p className="text-xs text-content-muted">
                Select your background and max budget to match eligible
                departments.
              </p>
            </div>
          </div>
          <span className="text-xs font-medium text-brand-600 dark:text-brand-400">
            * Background & Max Budget required
          </span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7"
        >
          <FormField label="SSC GPA" htmlFor="sscGpa">
            <Input
              id="sscGpa"
              type="number"
              step="0.01"
              min="1"
              max="5"
              placeholder="Optional (e.g. 4.80)"
              className={
                errors.sscGpa ? "border-red-500 focus:border-red-500" : ""
              }
              {...register("sscGpa", { min: 1, max: 5 })}
            />
          </FormField>

          <FormField label="HSC GPA" htmlFor="hscGpa">
            <Input
              id="hscGpa"
              type="number"
              step="0.01"
              min="1"
              max="5"
              placeholder="Optional (e.g. 4.50)"
              className={
                errors.hscGpa ? "border-red-500 focus:border-red-500" : ""
              }
              {...register("hscGpa", { min: 1, max: 5 })}
            />
          </FormField>

          <FormField
            label="Background *"
            htmlFor="background"
            className="col-span-2 md:col-span-1"
          >
            <Select
              id="background"
              className={
                errors.background ? "border-red-500 focus:border-red-500" : ""
              }
              {...register("background", { required: true })}
            >
              <option value="">Select Group</option>
              {BACKGROUNDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Min Budget (BDT)" htmlFor="minBudget">
            <Input
              id="minBudget"
              type="number"
              min="0"
              placeholder="Optional (e.g. 300000)"
              className={
                errors.minBudget ? "border-red-500 focus:border-red-500" : ""
              }
              {...register("minBudget", { min: 0 })}
            />
          </FormField>

          <FormField label="Max Budget (BDT) *" htmlFor="maxBudget">
            <Input
              id="maxBudget"
              type="number"
              min="0"
              placeholder="e.g. 800000"
              className={
                errors.maxBudget ? "border-red-500 focus:border-red-500" : ""
              }
              {...register("maxBudget", { required: true, min: 0 })}
            />
          </FormField>

          <FormField
            label="Division"
            htmlFor="division"
            className="col-span-2 md:col-span-1"
          >
            <Select id="division" {...register("division")}>
              <option value="">All Divisions</option>
              {DIVISIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </FormField>

          <div className="col-span-2 flex items-end md:col-span-4 lg:col-span-1">
            <Button type="submit" size="md" className="w-full">
              <Search className="h-4 w-4" /> Search
            </Button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

export default QuickSearch;
