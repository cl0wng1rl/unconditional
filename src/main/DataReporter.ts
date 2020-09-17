import Conditional from "./Conditional";

type MainReportData = { total: number; files: number; average: number };
type ComparativeData = { "percent included": number; "files exceeding max": number };
type ReportData = { included: MainReportData; layer: MainReportData; summary: ComparativeData };

type TableSection = { Section: string; total: number; files: number; average: number };
type TableObject = { _data: TableSection[] };

export default class DataReporter {
  private data: ReportData = DataReporter.defaultReportData();

  constructor(included: Conditional[], layer: Conditional[], nonLayer: Conditional[], max: number) {
    this.data = this.getData(included, layer, nonLayer, max);
  }

  public getDataObject(): TableObject {
    return { _data: [this.getIncludedSection(this.data), this.getLayerSection(this.data)] };
  }

  public getPercentIncluded(): number {
    return this.data.summary["percent included"];
  }

  public getNumberOfExceedingFiles(): number {
    return this.data.summary["files exceeding max"];
  }

  private getData(
    included: Conditional[],
    layer: Conditional[],
    nonLayer: Conditional[],
    max: number
  ): ReportData {
    const data: ReportData = DataReporter.defaultReportData();
    data.included = this.getMainReportData(included);
    data.layer = this.getMainReportData(layer);
    data.summary = this.getComparativeData(included, layer, nonLayer, max);
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
    nonLayer: Conditional[],
    max: number
  ): ComparativeData {
    const data = DataReporter.defaultComparativeData();
    data["percent included"] = (100 * layer.length) / included.length;
    data["files exceeding max"] = this.getFilesExceedingMax(nonLayer, max);
    return data;
  }

  private getFilesExceedingMax(conditionals: Conditional[], max: number) {
    return [...this.getPathsSet(conditionals)]
      .map((path) => ({
        path: path,
        count: conditionals.filter((cond) => cond.getFilePath() === path).length,
      }))
      .filter((obj) => obj.count > max).length;
  }

  private getPathsSet(conditionals: Conditional[]): Set<string> {
    return new Set(conditionals.map((cond) => cond.getFilePath()));
  }

  private static defaultReportData(): ReportData {
    const defaultData = DataReporter.defaultMainReportData();
    const defaultComparative = DataReporter.defaultComparativeData();
    return { included: defaultData, layer: defaultData, summary: defaultComparative };
  }

  private getIncludedSection = (data: ReportData) => ({ Section: "Included", ...data.included });
  private getLayerSection = (data: ReportData) => ({ Section: "Layer", ...data.layer });

  private static defaultMainReportData = (): MainReportData => ({ total: 0, files: 0, average: 0 });
  private static defaultComparativeData = (): ComparativeData => ({
    "percent included": 0,
    "files exceeding max": 0,
  });
}
