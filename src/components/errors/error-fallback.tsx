import { useRouteError } from "react-router";

import { Button } from "@/components/ui/button";

export const ErrorFallback = () => {
	const error = useRouteError();
	console.error(error);

	const err = error as { message: string };

	return (
		<div className="relative flex h-screen flex-col items-center justify-center text-center">
			<h1 className="text-xl font-bold">Erro!</h1>
			<p className="mt-1 max-w-xs text-sm text-foreground/55">
				Desculpe, ocorreu algum erro. Tente recarregar a aplicação clicando no
				botão abaixo.
			</p>

			<p className="my-4 text-sm italic opacity-40">{err.message}</p>

			<Button onClick={() => window.location.reload()}>Tentar novamente</Button>
		</div>
	);
};
