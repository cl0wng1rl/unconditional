import Conditional from "./Conditional";

type MainReportData = { total: number; files: number; average: number };
type ComparativeData = { "percent included": number; "files exceeding max": number };
type ReportData = { included: MainReportData; layer: MainReportData; summary: ComparativeData };

export default class DataReporter {
  private data: ReportData = DataReporter.defaultReportData();

  public printData(included: Conditional[], layer: Conditional[], max: number): void {
    this.data = this.getData(included, layer, max);
  }

  private getData(included: Conditional[], layer: Conditional[], max: number): ReportData {
    const data: ReportData = DataReporter.defaultReportData();
    data.included = this.getMainReportData(included);
    data.layer = this.getMainReportData(layer);
    data.summary = this.getComparativeData(included, layer, max);
    return data;
  }

  private getMainReportData(included: Conditional[]): MainReportData {
    const data = DataReporter.defaultMainReportData();
    data.total = included.length;
    data.files = new Set(included.map((cond) => cond.getFilePath())).size;
    data.average = data.total / data.files;
    return data;
  }

  private getComparativeData(
    included: Conditional[],
    layer: Conditional[],
    max: number
  ): ComparativeData {
    const data = DataReporter.defaultComparativeData();
    data["percent included"] = (100 * layer.length) / included.length;
    data["files exceeding max"] = this.getFilesExceedingMax(included, max);
    return data;
  }

  private getFilesExceedingMax(conditionals: Conditional[], max: number) {
    return [...this.includedPathsSet(conditionals)]
      .map((path) => ({
        path: path,
        count: conditionals.filter((cond) => cond.getFilePath() === path).length,
      }))
      .filter((obj) => obj.count > max).length;
  }

  private includedPathsSet(included: Conditional[]): Set<string> {
    return new Set(included.map((cond) => cond.getFilePath()));
  }

  private static defaultReportData(): ReportData {
    const defaultData = DataReporter.defaultMainReportData();
    const defaultComparative = DataReporter.defaultComparativeData();
    return { included: defaultData, layer: defaultData, summary: defaultComparative };
  }

  private static defaultMainReportData(): MainReportData {
    return { total: 0, files: 0, average: 0 };
  }

  private static defaultComparativeData(): ComparativeData {
    return { "percent included": 0, "files exceeding max": 0 };
  }
}
