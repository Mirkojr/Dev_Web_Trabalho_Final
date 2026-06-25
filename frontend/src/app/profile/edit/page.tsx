import AppShell from "@/components/layout/AppShell";
import EditProfileForm from "@/components/profile/EditProfileForm";

export default function EditProfilePage() {
	return (
		<AppShell active="conta">
			<EditProfileForm />
		</AppShell>
	);
}