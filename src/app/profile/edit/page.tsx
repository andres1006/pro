import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { EditProfileForm } from "@/components/profile/EditProfileForm";

export default function EditProfilePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProfileHeader title="Edit Profile" backHref="/profile" />

      <main className="p-4 md:p-6">
        <EditProfileForm />
      </main>
    </div>
  );
}
