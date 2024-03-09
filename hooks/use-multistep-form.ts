import { useState } from "react";
import { z } from "zod";

export function useMulitstepForm(
    steps: { id: string; title: string; fields: string[] }[],
    formSchema: z.ZodObject<any>,
    form: z.infer<typeof formSchema>
) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    let isLastStep = currentStepIndex === steps.length - 1;

    type FieldName = keyof typeof form;

    async function next() {
        const fields = steps[currentStepIndex].fields;
        const output = await form.trigger(fields as FieldName[], {
            shouldFocus: true,
        });

        if (!output) return;

        setCurrentStepIndex((i) => {
            if (i < steps.length - 1) {
                return i + 1;
            }
            return i;
        });
    }

    function back() {
        setCurrentStepIndex((i) => {
            if (i > 0) {
                return i - 1;
            }
            return i;
        });
    }

    function goTo(index: number) {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        setCurrentStepIndex,
        step: steps[currentStepIndex],
        isFirstStep: currentStepIndex === 0,
        isLastStep,
        goTo,
        next,
        back,
        steps,
    };
}
