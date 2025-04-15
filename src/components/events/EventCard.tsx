import Image from "next/image";
import React from "react";

interface Participant {
  id: string;
  avatarUrl: string;
}

interface EventCardProps {
  imageUrl: string;
  title: string;
  location: string;
  distance: string;
  dateTime: string;
  actionText: string;
  onActionClick: () => void;
  participants?: Participant[];
}

const EventCard: React.FC<EventCardProps> = ({
  imageUrl,
  title,
  location,
  distance,
  dateTime,
  actionText,
  onActionClick,
  participants = [], // Default to empty array if no participants
}) => {
  const showParticipants = participants.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800/60 backdrop-blur-md rounded-lg shadow-lg overflow-hidden text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700/50 ">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {location}{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            · {distance}
          </span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {dateTime}
        </p>

        <div className="flex items-center justify-between">
          {showParticipants ? (
            <div className="flex -space-x-2 overflow-hidden">
              {participants.slice(0, 4).map(
                (
                  p // Show max 4 avatars
                ) => (
                  <Image
                    key={p.id}
                    src={p.avatarUrl}
                    alt="Participant"
                    width={32}
                    height={32}
                    className="inline-block rounded-full ring-2 ring-white dark:ring-gray-800"
                  />
                )
              )}
              {participants.length > 4 && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 ring-2 ring-white dark:ring-gray-800 text-xs font-semibold text-gray-700 dark:text-white">
                  +{participants.length - 4}
                </div>
              )}
            </div>
          ) : (
            // Empty div to maintain layout if no participants
            <div></div>
          )}
          <button
            onClick={onActionClick}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              showParticipants
                ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white" // Style for "Ver detalles" with dark/light modes
                : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white" // Style for "Participar"
            }`}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
