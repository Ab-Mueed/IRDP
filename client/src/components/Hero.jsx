import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./ui/text-reveal-card";

export default function Hero({ rating }) {
  return (
    <div className="flex items-center justify-center h-auto sm:h-[20rem] mt-4 rounded-2xl w-full px-4">
      <TextRevealCard className="text-lg md:text-sm" text="Reveal Rating" revealText={rating}>
        <TextRevealCardTitle className="text-2xl">
          Find out how well your resume matches a job description.
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          This is a rating reveal card. Hover over the card to see how closely
          your resume aligns with the job description.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
}
