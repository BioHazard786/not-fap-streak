"use client";
import { getDateDifference } from "@/lib/streak-utils";
import { useCallback, useEffect, useRef } from "react";
import "./FlipClock.css";

interface FlipClockProps {
  streakStartDate: string;
  userName?: string;
}

export default function FlipClock({
  streakStartDate,
  userName,
}: FlipClockProps) {
  // Refs for each digit block
  const yearsRef = useRef<HTMLDivElement>(null);
  const monthsRef = useRef<HTMLDivElement>(null);
  const daysRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);

  // Optimized flip animation
  const flipTo = useCallback((digitElement: HTMLElement, n: string) => {
    const current = digitElement.getAttribute("data-num");
    if (current === n) return; // Skip if no change needed

    digitElement.setAttribute("data-num", n);

    const frontFlap = digitElement.querySelector(".front") as HTMLElement;
    const backFlap = digitElement.querySelector(".back") as HTMLElement;
    const underFlap = digitElement.querySelector(".under") as HTMLElement;
    const baseSpan = digitElement.querySelector(".base") as HTMLElement;

    if (frontFlap) frontFlap.setAttribute("data-content", current || "0");
    if (backFlap) backFlap.setAttribute("data-content", n);
    if (underFlap) underFlap.setAttribute("data-content", n);

    // Show flaps and add animation classes
    const flaps = digitElement.querySelectorAll(
      ".flap"
    ) as NodeListOf<HTMLElement>;
    flaps.forEach((flap) => {
      flap.style.display = "block";
      flap.classList.add("animating");
    });

    setTimeout(() => {
      if (baseSpan) baseSpan.textContent = n;
      flaps.forEach((flap) => {
        flap.style.display = "none";
        flap.classList.remove("animating");
      });
    }, 350);
  }, []);

  // Jump to number without animation
  const jumpTo = useCallback((digitElement: HTMLElement, n: string) => {
    digitElement.setAttribute("data-num", n);
    const baseSpan = digitElement.querySelector(".base") as HTMLElement;
    if (baseSpan) baseSpan.textContent = n;
  }, []);

  // Update digit group with improved logic
  const updateGroup = useCallback(
    (
      groupRef: React.RefObject<HTMLDivElement | null>,
      n: number,
      flip: boolean
    ) => {
      if (!groupRef.current) return;

      const digits = groupRef.current.querySelectorAll(
        ".digit"
      ) as NodeListOf<HTMLElement>;
      const numStr = String(n).padStart(2, "0");
      const num1 = numStr[0]; // tens
      const num2 = numStr[1]; // ones

      if (digits[0] && digits[0].getAttribute("data-num") !== num1) {
        flip ? flipTo(digits[0], num1) : jumpTo(digits[0], num1);
      }
      if (digits[1] && digits[1].getAttribute("data-num") !== num2) {
        flip ? flipTo(digits[1], num2) : jumpTo(digits[1], num2);
      }
    },
    [flipTo, jumpTo]
  );

  useEffect(() => {
    // Initialize with current values (no animation on first load)
    const initialData = getDateDifference(streakStartDate);
    updateGroup(yearsRef, initialData.years, false);
    updateGroup(monthsRef, initialData.months, false);
    updateGroup(daysRef, initialData.days, false);
    updateGroup(hoursRef, initialData.hours, false);
    updateGroup(minutesRef, initialData.minutes, false);
    updateGroup(secondsRef, initialData.seconds, false);

    const interval = setInterval(() => {
      const newTimeData = getDateDifference(streakStartDate);

      // Update with animation (flip = true)
      updateGroup(yearsRef, newTimeData.years, true);
      updateGroup(monthsRef, newTimeData.months, true);
      updateGroup(daysRef, newTimeData.days, true);
      updateGroup(hoursRef, newTimeData.hours, true);
      updateGroup(minutesRef, newTimeData.minutes, true);
      updateGroup(secondsRef, newTimeData.seconds, true);
    }, 1000);

    return () => clearInterval(interval);
  }, [streakStartDate, updateGroup]);

  return (
    <div className="clock-container">
      <h1 className="clock-title">{userName} No Fap Streak</h1>
      <div className="clock">
        <DigitBlock label="Years" ref={yearsRef} />
        <DigitBlock label="Months" ref={monthsRef} />
        <DigitBlock label="Days" ref={daysRef} />
        <DigitBlock label="Hours" ref={hoursRef} />
        <DigitBlock label="Minutes" ref={minutesRef} />
        <DigitBlock label="Seconds" ref={secondsRef} />
      </div>
    </div>
  );
}

const DigitBlock = ({
  label,
  ref,
}: {
  label: string;
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div className="single-clock-block" ref={ref}>
      <div className="digit-block">
        <div className="digit" data-num="0">
          <span className="base">0</span>
          <div className="flap over front" data-content="0"></div>
          <div className="flap over back" data-content="0"></div>
          <div className="flap under" data-content="0"></div>
        </div>

        <div className="digit" data-num="0">
          <span className="base">0</span>
          <div className="flap over front" data-content="0"></div>
          <div className="flap over back" data-content="0"></div>
          <div className="flap under" data-content="0"></div>
        </div>
      </div>
      <div className="labels">{label}</div>
    </div>
  );
};
