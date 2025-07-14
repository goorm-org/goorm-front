import { Button, Card } from "@vapor-ui/core";
import Link from "next/link";

export default function LandingFooter() {
  return (
    <Card.Root className="bg-transparent border-none">
      <Card.Footer className="flex h-full items-center justify-center bg-[#e8e8e8]">
        <Link href="/onboarding" className="w-full">
          <Button stretch size="lg" className="bg-primary-700">
            Go
          </Button>
        </Link>
      </Card.Footer>
    </Card.Root>
  );
}
