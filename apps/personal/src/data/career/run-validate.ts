import { formatValidationReport, runCareerValidation } from "./validate";

const result = runCareerValidation();
console.log(formatValidationReport(result));

if (!result.ok) {
  process.exit(1);
}

if (result.warnings.length > 0) {
  process.exit(0);
}
