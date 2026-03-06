"use client";

import { Button } from "@relume_io/relume-ui";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Carousel } from "@/components/Carousel";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ shadcn/ui
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import { guests } from "@/data/guests"; // 👈 make sure this is the real path

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Guest = {
  slug: string;
  firstName: string;
  lastName: string;
  count: number; // max invited
  table: string; // table number (string to allow "A1", "12", etc.)
  family?: string; // optional
};

function getTimeLeft(target: Date) {
  const total = target.getTime() - Date.now();

  if (total <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { done: false, days, hours, minutes, seconds };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function ClientHome() {
  // ✅ Countdown target (set your wedding date/time here)
  const WEDDING_DATE = new Date("2026-03-25T09:00:00+05:30"); // Sri Lanka time example

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(WEDDING_DATE));

  const gallery = useMemo(
    () => [
      { src: "/gallery/_RRR1020.jpg", alt: "Reshoot 1" },
      { src: "/gallery/_RRR1096.jpg", alt: "Reshoot 2" },
      { src: "/gallery/_RRR1157.jpg", alt: "Reshoot 3" },
      { src: "/gallery/_RRR1175.jpg", alt: "Reshoot 4" },
      { src: "/gallery/_RRR1178.jpg", alt: "Reshoot 5" },
      { src: "/gallery/_RRR1203.jpg", alt: "Reshoot 6" },
      { src: "/gallery/_RRR1226.jpg", alt: "Reshoot 7" },
      { src: "/gallery/_RRR1261.jpg", alt: "Reshoot 8" },
      { src: "/gallery/_RRR1291.jpg", alt: "Reshoot 9" },
      { src: "/gallery/_RRR1405.jpg", alt: "Reshoot 10" },
      { src: "/gallery/_RRR1556.jpg", alt: "Reshoot 11" },
      { src: "/gallery/_RRR1700.jpg", alt: "Reshoot 12" },
      { src: "/gallery/_RRR1794.jpg", alt: "Reshoot 13" },
    ],
    [],
  );

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const slides = gallery.map((g) => ({ src: g.src, alt: g.alt }));

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(getTimeLeft(WEDDING_DATE));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 2500, once: false, mirror: true });
  }, []);

  // Inputs
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  // Selected guest result
  const [selected, setSelected] = useState<Guest | null>(null);

  // Reservation form
  const [coming, setComing] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  const normalizedFirst = first.trim().toLowerCase();
  const normalizedLast = last.trim().toLowerCase();

  // Smart search results
  const matches = useMemo(() => {
    const list = guests as Guest[];

    // If both empty, show nothing
    if (!normalizedFirst && !normalizedLast) return [];

    return list
      .filter((g) => {
        const f = g.firstName?.toLowerCase() ?? "";
        const l = g.lastName?.toLowerCase() ?? "";

        // match logic:
        // - if first provided: must match prefix
        // - if last provided: must match prefix
        const firstOk = normalizedFirst ? f.startsWith(normalizedFirst) : true;
        const lastOk = normalizedLast ? l.startsWith(normalizedLast) : true;
        return firstOk && lastOk;
      })
      .slice(0, 8); // limit dropdown size
  }, [normalizedFirst, normalizedLast]);

  // When user selects a guest from suggestions
  const selectGuest = (g: Guest) => {
    setSelected(g);
    setFirst(g.firstName);
    setLast(g.lastName);
    setComing(Math.min(1, g.count)); // default 1 (or 0) but never exceed max
    setNote("");
  };

  const maxAllowed = selected?.count ?? 0;

  const handleConfirm = () => {
    if (!selected) {
      setNote("Please select your name from the list first.");
      return;
    }
    if (coming < 0 || coming > maxAllowed) {
      setNote(`Please enter a number between 0 and ${maxAllowed}.`);
      return;
    }
    setNote(
      `✅ Reservation saved for ${selected.firstName} ${selected.lastName}: ${coming} attending (Table ${selected.table}).`,
    );
  };

  return (
    <section className="bg-color-primary font_1">
      <div className="relative h-screen w-full overflow-hidden">
        <Carousel />
      </div>
      {/* ✅ Announcement / Save-the-date style card (after first background) */}
      <div data-aos="fade-up" className="px-[5%] py-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border bg-white/30 backdrop-blur">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Image */}
              <div className="relative aspect-square md:aspect-auto md:min-h-[380px]">
                <Image
                  src="/mobile/couple_4.png"
                  alt="Shehan and Udari"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Right: Text */}
              <div className="p-6 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl tracking-wide leading-tight">
                  Shehan &amp; Udari
                </h2>

                <p className="mt-3 text-lg md:text-2xl opacity-90">
                  are getting married
                </p>

                <p className="mt-6 text-base md:text-xl opacity-80">
                  Wednesday, March 25, 2026
                </p>

                {/* Optional small line */}
                <p className="mt-2 text-sm md:text-base opacity-70">
                  Scroll down to RSVP and details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-up"
        id="rsvp"
        className="px-[5%] pt-16 md:py-24 lg:pt-28"
      >
        <h1 className="text-3xl md:text-7xl text-center">
          Please Enter Your Name
        </h1>

        <div className="mx-auto mt-10 max-w-3xl ">
          <Card className="rounded-2xl  bg-white/30 backdrop-blur">
            <CardContent className="p-6 md:p-8">
              {/* Inputs */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="e.g., Anura"
                    value={first}
                    onChange={(e) => {
                      setFirst(e.target.value);
                      setSelected(null);
                      setNote("");
                    }}
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="e.g., Silva"
                    value={last}
                    onChange={(e) => {
                      setLast(e.target.value);
                      setSelected(null);
                      setNote("");
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Smart search suggestions */}
              {matches.length > 0 && !selected && (
                <div className="mt-4 rounded-xl border p-2">
                  <p className="px-2 py-1 text-sm opacity-70">
                    Select your name:
                  </p>
                  <div className="flex flex-col">
                    {matches.map((g) => (
                      <button
                        key={g.slug}
                        type="button"
                        onClick={() => selectGuest(g)}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-muted"
                      >
                        <span className="font-medium">
                          {g.firstName} {g.lastName}
                          {g.family ? ` (${g.family})` : ""}
                        </span>
                        <span className="text-sm opacity-70">
                          Table {g.table} • Invited {g.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected guest details */}
              {selected && (
                <div className="mt-6 rounded-xl border p-4">
                  <p className="text-lg font-semibold">
                    Hello, {selected.firstName} {selected.lastName} 👋
                  </p>
                  <p className="mt-1 opacity-80">
                    You are invited for{" "}
                    <span className="font-semibold">{selected.count}</span>{" "}
                    guest(s).
                  </p>
                  <p className="opacity-80">
                    Your table number:{" "}
                    <span className="font-semibold">{selected.table}</span>
                  </p>

                  {/* Reservation confirmation */}
                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-end">
                    <div className="space-y-2">
                      <Label htmlFor="coming">
                        How many participants are coming? (max {maxAllowed})
                      </Label>
                      <Input
                        id="coming"
                        type="number"
                        min={0}
                        max={maxAllowed}
                        value={coming}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          // clamp live
                          const clamped = Number.isFinite(val)
                            ? Math.max(0, Math.min(maxAllowed, val))
                            : 0;
                          setComing(clamped);
                          setNote("");
                        }}
                      />
                      <p className="text-xs opacity-60">
                        You can select from 0 to {maxAllowed}.
                      </p>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      className="rounded-full px-6 py-4 font-semibold"
                      onClick={handleConfirm}
                    >
                      Confirm Reservation
                    </Button>
                  </div>

                  {note && (
                    <p className="mt-4 rounded-lg bg-muted p-3 text-sm">
                      {note}
                    </p>
                  )}
                </div>
              )}

              {/* No results message */}
              {!selected &&
                (normalizedFirst || normalizedLast) &&
                matches.length === 0 && (
                  <p className="mt-4 text-sm opacity-70">
                    No matching name found. Please check spelling.
                  </p>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="my-12">
        <h1 className="text-3xl md:text-7xl text-center">Our Story</h1>
        <div className="my-5 md:mb-6 flex justify-center">
          <Image
            src="/mobile/_RRR1291.png"
            alt="image"
            width={1200}
            height={800}
            sizes="100vw"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="my-5 md:mb-6 flex justify-center">
          {/* ✅ Mobile Image */}
          <Image
            src="/mobile/our_story.png"
            alt="Our Story"
            width={400}
            height={500}
            className="block md:hidden h-auto w-[280px] object-cover"
          />

          {/* ✅ Desktop Image */}
          <Image
            src="/mobile/our_story.png"
            alt="Our Story"
            width={600}
            height={700}
            className="hidden md:block h-auto w-[400px] object-cover"
          />
        </div>
      </div>

      <div data-aos="fade-up" className="px-[5%] pb-16 md:pb-24 lg:pb-28">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl">
            Counting Down to Forever
          </h2>

          <p className="mt-3 text-base md:text-lg opacity-80">
            ♡ Our special day is almost here ♡
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: pad2(timeLeft.hours) },
              { label: "MINUTES", value: pad2(timeLeft.minutes) },
              { label: "SECONDS", value: pad2(timeLeft.seconds) },
            ].map((item) => (
              <Card
                key={item.label}
                className="rounded-2xl border bg-white/70 shadow-sm backdrop-blur"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 md:p-10">
                  <div className="text-5xl md:text-7xl font-semibold tracking-tight">
                    {item.value}
                  </div>
                  <div className="mt-2 text-xs md:text-sm tracking-[0.2em] opacity-70">
                    {item.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {timeLeft.done && (
            <p className="mt-6 rounded-xl bg-muted p-3 text-sm">
              🎉 It’s wedding time! 🎉
            </p>
          )}
        </div>
      </div>
      <div className="my-5 md:mb-6 flex justify-center">
        <Image
          src="/mobile/group_112.png"
          alt="image"
          width={1200}
          height={800}
          sizes="100vw"
          className="w-full h-auto object-cover"
        />
      </div>
      <div data-aos="fade-up" className="px-[5%] py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 md:grid-cols-2 md:gap-20">
            <div>
              <h2 className="text-5xl md:text-6xl tracking-wide">PROGRAM</h2>

              <div className="mt-10 space-y-8">
                {[
                  { time: "5:00 PM", title: "Welcome Photos & Cocktails" },
                  { time: "6:00 PM", title: "Dinner Program" },
                  { time: "7:00 PM", title: "Toasts & Speeches" },
                  { time: "8:00 PM", title: "Official Picture Taking" },
                  { time: "9:00 PM", title: "Open Bar & Dancing" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-baseline gap-10">
                      <div className="w-[95px] text-lg md:text-xl opacity-90">
                        {item.time}
                      </div>
                      <div className="text-xl md:text-2xl tracking-wide opacity-95">
                        {item.title}
                      </div>
                    </div>
                    <div className="mt-6 border-b border-dotted border-black/40" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-5xl md:text-6xl tracking-wide">RECEPTION</h2>

              <div className="mt-10 space-y-10">
                <div>
                  <h3 className="text-2xl md:text-3xl">Reception Venue</h3>
                  <p className="mt-3 text-base md:text-lg leading-relaxed opacity-80">
                    Our reception will take place in The Sunroom at Rizal
                    Gardens — an open-air garden space. The celebration will be
                    outdoors, so expect fresh air, soft grass, and lots of
                    golden hour glow.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl">Dress Code</h3>
                  <p className="mt-3 text-base md:text-lg leading-relaxed opacity-80">
                    Garden party chic! Flowy, breathable fabrics and comfortable
                    shoes (heels are optional, sinking in the grass is not
                    required). Pastel colors are preferred but not mandatory!
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl">Parking & Directions</h3>
                  <p className="mt-3 text-base md:text-lg leading-relaxed opacity-80">
                    Free parking is available on-site, with designated areas for
                    PWDs and senior guests. If you need special assistance or a
                    drop-off closer to the garden entrance, let us know.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-aos="fade-up" className="px-[5%] pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            {/* ✅ Desktop Image (right side) */}
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden md:block w-[550px]">
              <Image
                src="/mobile/Group_114.png"
                alt="decor"
                fill
                className="object-cover object-right opacity-90"
              />
            </div>

            <h2 className="text-5xl md:text-6xl tracking-wide">
              WHAT TO EXPECT
            </h2>

            {/* Desktop padding so text avoids image */}
            <div className="mt-10 space-y-8 text-base md:text-lg leading-relaxed opacity-85 md:pr-[600px]">
              {/* Your content */}
              <div>
                <p className="text-xl md:text-2xl opacity-95">
                  🎶 <span className="font-medium">Live Music & Dancing</span>
                </p>
                <p className="mt-2">
                  A live band will bring energy to the night — so don’t forget
                  your dancing shoes!
                </p>
              </div>

              <div>
                <p className="text-xl md:text-2xl opacity-95">
                  📸 <span className="font-medium">Photo Booth Fun</span>
                </p>
                <p className="mt-2">
                  Strike a pose, grab a prop, and take home a snapshot of the
                  celebration.
                </p>
              </div>

              <div>
                <p className="text-xl md:text-2xl opacity-95">
                  🍸 <span className="font-medium">Open Bar</span>
                </p>
                <p className="mt-2">
                  Signature cocktails, fine spirits, and plenty of cheers.
                </p>
              </div>

              <div>
                <p className="text-xl md:text-2xl opacity-95">
                  ☎ <span className="font-medium">Wedding Phonebook</span>
                </p>
                <p className="mt-2">
                  Pick up the phone and leave us a message we can replay for
                  years to come.
                </p>
              </div>

              <div>
                <p className="text-xl md:text-2xl opacity-95">
                  🎉 <span className="font-medium">Interactive Moments</span>
                </p>
                <p className="mt-2">
                  Games, surprises, and shared laughter throughout the evening.
                </p>
              </div>

              {/* ✅ Mobile Image (below text) */}
              <div className="mt-10 flex justify-center md:hidden">
                <Image
                  src="/mobile/Group_114.png"
                  alt="decor"
                  width={320}
                  height={420}
                  className="h-auto w-[280px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-aos="fade-up" className="px-[5%] pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            {/* ✅ Desktop QR (left side) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden md:block w-[550px]">
              <Image
                src="/mobile/qr.png"
                alt="QR"
                fill
                className="object-contain opacity-90"
              />
            </div>

            <div>
              <h2 className="text-5xl md:text-6xl tracking-wide md:pl-[600px]">
                CAPTURE THE NIGHT
              </h2>

              <div className="mt-10 space-y-8 text-base md:text-lg leading-relaxed opacity-85 md:pl-[600px]">
                <p className="text-xl md:text-2xl opacity-95">
                  We’ve created a special POV disposable film camera experience
                  just for our wedding. Scan the QR code to capture candid
                  moments from your perspective — the laughter, the dancing, the
                  little details we might miss. Every photo becomes part of our
                  story. 📷 Scan. Snap. Share the love.
                </p>

                {/* ✅ Mobile QR (after text) */}
                <div className="mt-10 flex justify-center md:hidden">
                  <Image
                    src="/mobile/qr.png"
                    alt="QR"
                    width={260}
                    height={260}
                    className="h-auto w-[260px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ✅ RESHOOT GALLERY */}
      <div data-aos="fade-up" className="px-[5%] pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-6xl tracking-wide">
            PRESHOOT GALLERY
          </h2>
          <p className="mt-3 text-base md:text-lg opacity-80">
            A few moments from our pre-shoot — tap any photo to view.
          </p>

          {/* ✅ Responsive grid */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
            {gallery.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => {
                  setGalleryIndex(i);
                  setGalleryOpen(true);
                }}
                className="group relative aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>

          {/* ✅ Lightbox */}
          <Lightbox
            open={galleryOpen}
            close={() => setGalleryOpen(false)}
            index={galleryIndex}
            slides={slides}
            controller={{ closeOnBackdropClick: true }}
          />
        </div>
      </div>
      {/* ✅ RSVP END SECTION */}
      <div data-aos="fade-up" className="px-[5%] pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-white/30 backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left image */}
            <div className="relative min-h-[260px] md:min-h-[520px]">
              <Image
                src="/mobile/bg_1.jpg" // ✅ replace with your final image
                alt="RSVP"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Right content */}
            <div className="p-8 md:p-14 flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl tracking-wide leading-tight">
                PLEASE RSVP
              </h2>

              <p className="mt-4 text-base md:text-lg opacity-80 leading-relaxed">
                We can’t wait to celebrate with you. Please confirm your
                attendance by submitting your name and number of guests.
              </p>

              <div className="mt-8">
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-full px-8 py-4 font-semibold"
                  onClick={() => {
                    document.getElementById("rsvp")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  RSVP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
