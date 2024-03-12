import { Button } from "../ui/button";

interface FormsButtonProps {
    currentStepIndex: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    disabled: boolean;
    next: () => void;
    back: () => void;
}

const FormsButton = ({
    isFirstStep,
    isLastStep,
    back,
    next,
    disabled,
}: FormsButtonProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-5 justify-end">
            {!isFirstStep && (
                <Button
                    type="button"
                    disabled={disabled}
                    className="w-full"
                    onClick={back}
                >
                    Back
                </Button>
            )}
            {!isLastStep && (
                <Button
                    type="button"
                    disabled={disabled}
                    className="w-full"
                    onClick={next}
                >
                    Next
                </Button>
            )}
            {isLastStep && (
                <Button type="submit" disabled={disabled} className="w-full">
                    Submit
                </Button>
            )}
        </div>
    );
};

export default FormsButton;
