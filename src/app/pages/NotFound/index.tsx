import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<div className="relative flex h-screen flex-col items-center justify-center text-center">
			<h1 className="text-xl font-bold">Oops!</h1>
			<p className="mb-4 mt-1 max-w-xs text-sm text-foreground/55">
				Desculpe, a página que você tentou acessar não existe mais.
			</p>

			<Button onClick={() => navigate("/")}>Voltar para Home</Button>
		</div>
	);
};
