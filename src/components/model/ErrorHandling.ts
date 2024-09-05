import { isAxiosError } from "axios";

export class ErrorHandling {
  private static errorHandlers: Record<number, () => void> = {
    404: () => {
      console.error("Not found (404)");
      throw new Error("Resource not found (404)");
    },
    500: () => {
      console.error("Internal server error (500)");
      throw new Error("Interal server problem");
    },
  };

  public static handle(error: unknown): void {
    if (isAxiosError(error)) {
      if (!error.response) {
        console.error("Network error");
        throw new Error("Network issue");
      }

      const status = error.response.status;
      const handler =
        ErrorHandling.errorHandlers[status] ||
        ErrorHandling.defaultErrorHandler;

      handler();
    } else {
      ErrorHandling.handleUnknownError(error);
    }
  }

  private static defaultErrorHandler(): void {
    console.error("An unhandled HTTP error");
    throw new Error("Something went wrong");
  }

  private static handleUnknownError(error: unknown): void {
    console.error("An unexpected error", error);
    throw new Error("Something went wrong");
  }
}
