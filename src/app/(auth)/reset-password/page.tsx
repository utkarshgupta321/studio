
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  // In a real app, you'd likely extract a token from the URL search params here
  // const searchParams = useSearchParams();
  // const token = searchParams.get('token');
  // if (!token) { /* Handle missing token, e.g., redirect or show error */ }
  return <ResetPasswordForm /* token={token} */ />;
}
