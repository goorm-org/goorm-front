import { Button, Card } from "@vapor-ui/core";
import Link from "next/link";

export default function LandingFooter() {
  return (
    <Card.Root className="bg-transparent border-none">
      <Card.Footer className="flex flex-col gap-[8px] h-30 items-center justify-center">
        <Link href="/onboarding" className="w-full">
          <Button stretch size="lg" className="bg-primary-700">
            Go
          </Button>
        </Link>
      </Card.Footer>
    </Card.Root>
  );
}
