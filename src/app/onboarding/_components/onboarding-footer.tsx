import { Button, Card } from "@vapor-ui/core";
import useStep from "../_hooks/useStep";

export default function OnboardingFooter() {
  const { nextStep } = useStep();
  return (
    <Card.Root className="border-none">
      <Card.Footer>
        <Button stretch className="bg-primary-700" size="lg" onClick={nextStep}>
          NEXT STEP
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
