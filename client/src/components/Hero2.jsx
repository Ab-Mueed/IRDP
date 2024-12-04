import {
    TextRevealCard,
    TextRevealCardDescription,
    TextRevealCardTitle,
  } from "../components/ui/text-reveal-card";
  
  export function Hero2({rating}) {
    return (
      <div className="flex items-center justify-center h-auto sm:h-[20rem] mt-4 rounded-2xl w-full px-4">
        <TextRevealCard
          text="Reveal Rating"
          revealText={rating}
        >
          <TextRevealCardTitle>
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
  