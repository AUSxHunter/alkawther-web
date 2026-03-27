import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-24 bg-white min-h-[60vh] flex items-center">
      <Container>
        <div className="text-center max-w-lg mx-auto">
          <p className="font-display font-bold text-gold" style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
            404
          </p>
          <h1 className="font-display font-semibold text-ink text-3xl mb-4">
            Page Not Found
          </h1>
          <p className="text-warm-gray leading-relaxed mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/">
              <Button size="md" variant="primary">
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="md">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
