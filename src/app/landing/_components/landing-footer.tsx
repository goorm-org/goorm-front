"use client";

import { Button, Card } from "@vapor-ui/core";
import Link from "next/link";

export default function LandingFooter() {
  return (
    <Card.Root className="bg-transparent border-none">
      <Card.Footer className="flex flex-col gap-[8px]">
        <Link href="/onboarding">
          <Button stretch size="lg" className="bg-primary-700">
            Go
          </Button>
        </Link>
        <Button
          stretch
          size="lg"
          variant="ghost"
          className="text-black underline"
        >
          SKIP
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
