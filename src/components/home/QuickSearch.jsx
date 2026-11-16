import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, Search } from "lucide-react";
import { FormField, Input, Select } from "@/components/common/Field";
import Button from "@/components/common/Button";
import { DIVISIONS, BACKGROUNDS } from "@/utils/constants";

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
    const params = new URLSearchParams();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== "" && v != null) params.set(k, v);
    });
    navigate(`/find?${params.toString()}`);
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
        <div className="mb-5 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
            <SlidersHorizontal className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-semibold text-content">
              Quick University Search
            </h2>
            <p className="text-xs text-content-muted">
              Enter your profile to match eligible universities within budget.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7"
        >
          <FormField label="SSC GPA" htmlFor="sscGpa">
            <Input
              id="sscGpa"
              type="number"
              step="0.01"
              min="0"
              max="5"
              placeholder="0.00–5.00"
              aria-invalid={!!errors.sscGpa}
              {...register("sscGpa", { min: 0, max: 5 })}
            />
          </FormField>

          <FormField label="HSC GPA" htmlFor="hscGpa">
            <Input
              id="hscGpa"
              type="number"
              step="0.01"
              min="0"
              max="5"
              placeholder="0.00–5.00"
              {...register("hscGpa", { min: 0, max: 5 })}
            />
          </FormField>

          <FormField
            label="Background"
            htmlFor="background"
            className="col-span-2 md:col-span-1"
          >
            <Select id="background" {...register("background")}>
              <option value="">Any</option>
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
              placeholder="700000"
              {...register("minBudget", { min: 0 })}
            />
          </FormField>

          <FormField label="Max Budget (BDT)" htmlFor="maxBudget">
            <Input
              id="maxBudget"
              type="number"
              min="0"
              placeholder="900000"
              {...register("maxBudget", { min: 0 })}
            />
          </FormField>

          <FormField
            label="Division"
            htmlFor="division"
            className="col-span-2 md:col-span-1"
          >
            <Select id="division" {...register("division")}>
              <option value="">All divisions</option>
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
