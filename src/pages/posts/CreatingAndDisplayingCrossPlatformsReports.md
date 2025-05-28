---
title: "Creating and Displaying Cross-Platform Reports with .NET 8 (The easy way)"
date: "October 23, 2024"
image: "/blogs/quest.png"
link: "/posts/CreatingAndDisplayingCrossPlatformsReports"
techStack: ["C#", ".NET"]
tags: ["Desktop", "Development", "Reporting"]
layout: "@/layouts/post.astro"
---

# Creating and Displaying Cross-Platform Reports with .NET 8 (The easy way)
In a [previous post](/posts/CreatingAndDisplayingReportsInAWPF), I showed how to create reports using a visual designer and display them with FastReport Open Source. But if you’re developing cross-platform applications, you might run into some hurdles with FastReport’s open-source version — it relies on Windows-only packages. This means that on Linux or macOS, things get complicated. You’d have to switch your graphics processor to something like Skia, which isn’t straightforward and requires a lot of extra work.

So, what’s the alternative? Enter **QuestPDF** — an MIT-licensed NuGet package that lets us dynamically create and display reports across all platforms. Plus, it allows us to show our reports in the default PDF viewer as temporary files. Let’s dive into how you can use QuestPDF for your projects.

## What Do We Lose, What Do We Gain?
Switching from FastReport to QuestPDF brings some changes:

* **No Visual Designer**: We lose FastReport’s visual designer. But don’t worry — we gain a powerful visual tool with hot reload features that speed up our development.
* **Code-Based Reports**: We’ll write code to create reports. This might sound daunting, but it actually simplifies dynamic data population. Understanding intricate functions is not necessary. Writing code for our reports will be straightforward.
* **Licensing**: QuestPDF is free for individuals or companies with less than $1 million USD in annual gross revenue. FastReport Open Source is free for any company size but has limitations, with many features requiring payment.

## Setting Up Our Environment
I’ll be using JetBrains Rider, but you can use Visual Studio as well — the steps are pretty similar.
<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*rSyXe9l_bEtGfve4SAHU5g.png" alt="QuestPDF website">

1. **Install QuestPDF**: Add the QuestPDF package to your project via NuGet.
2. **Get the Companion App**: To preview your reports visually, download the [QuestPDF Companion App](https://www.questpdf.com/companion/download.html). It’s available for Windows, Linux (.deb), and macOS.
3. **Set the License Type**: In your ```Program.cs``` or ```Startup.cs```, specify the license type:

```csharp
QuestPDF.Settings.License = LicenseType.Community;
```

This is essential for compliance, and since the library doesn’t require a license key, it’s straightforward.

## Creating Your Report
Unlike FastReport, QuestPDF uses code instead of a visual designer. But don’t let that intimidate you — the code is quite approachable.

Here are the basics:

* **Create a Report Class**: Each report is a class that implements the ```IDocument``` interface from QuestPDF.
* **Define the Document Structure**: Use the Compose method to set up the layout, including the page size, margins, headers, footers, and content.
* **Use Containers**: All elements are placed inside containers, allowing for organized and flexible layouts.

Here’s a simple starting point for your report class:
```csharp
public class SimpleReport : IDocument
{
    public DocumentMetadata GetDocumentMetadata() => DocumentMetadata.Default;

    public void Compose(IDocumentContainer container)
    {
        container.Page(page =>
        {
            page.Margin(20);
            page.Size(PageSizes.A4);
            page.DefaultTextStyle(x => x.FontSize(12));

            page.Header().Text("My Simple Report").FontSize(20).Bold();
            page.Content().Text("Hello, QuestPDF!");
            page.Footer().AlignCenter().Text(x =>
            {
                x.Span("Page ");
                x.CurrentPageNumber();
            });
        });
    }
}
```

## Previewing with the Companion App
To see your report in real-time:

* **Run the Companion App**: Make sure it’s open and running.

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*f-lBbSlSlni8lPLWz--DQQ.gif" alt="QuestPDF Companion App">

* **Generate the Report**: In your application, create an instance of your report class and use ```ShowInCompanionAsync()```.
```csharp
public async Task GenerateReport()
{
    var report = new SimpleReport();
    await report.ShowInCompanionAsync();
}
```

Now, every time you make changes to your report code, the Companion App will update the preview instantly.

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*2omQUkPPG1Tz4qq0hx9cqg.gif" alt="QuestPDF Companion App Preview">

**Note for Linux Users**: If you run into issues with the Companion App, check the installation path and permissions. You might need to create a symbolic link or handle exceptions to get it working smoothly.

## Displaying the Report to Users
When it’s time to show the report to your users, you won’t use the Companion App. Instead, generate a PDF and open it with the default PDF viewer:
```csharp
public void ShowReportToUser()
{
    var report = new SimpleReport();
    report.GeneratePdfAndShow();
}
```
This method creates a temporary PDF file and opens it, providing a seamless experience for your users.
<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*61Un_hMrMUUKLeHwoAGFYA.gif" alt="QuestPDF Report Display">

## A More Detailed Example
Here’s an example of a report for an inventory system:
```csharp
public class StockReportDocument : IDocument
{
    private List<StockLevel> StockLevels;
    private List<Product> Products;
    private List<Warehouse> Warehouses;

    public StockReportDocument(List<StockLevel> stockLevels, List<Product> products, List<Warehouse> warehouses)
    {
        StockLevels = stockLevels;
        Products = products;
        Warehouses = warehouses;
    }

    public DocumentMetadata GetDocumentMetadata() => DocumentMetadata.Default;

    public void Compose(IDocumentContainer container)
    {
        container.Page(page =>
        {
            page.Margin(20);
            page.Size(PageSizes.Letter);
            page.DefaultTextStyle(x => x.FontSize(12));

            page.Header().Element(ComposeHeader);
            page.Content().Element(ComposeContent);
            page.Footer().Element(ComposeFooter);
        });
    }

    void ComposeHeader(IContainer container)
    {
        container.Row(row =>
        {
            row.RelativeItem().Column(column =>
            {
                column.Item().Text("Stock Report").FontSize(20).Bold();
                column.Item().Text($"Date: {DateTime.Now:d}");
            });
        });
    }

    void ComposeContent(IContainer container)
    {
        // Prepare data for the table
        var tableData = from sl in StockLevels
                        join p in Products on sl.ProductID equals p.ProductId
                        join w in Warehouses on sl.WarehouseID equals w.WarehouseID
                        select new
                        {
                            p.Name,
                            Warehouse = w.Name,
                            w.Location,
                            sl.CurrentStock,
                            p.UnitOfMeasure
                        };

        container.Table(table =>
        {
            // Define columns
            table.ColumnsDefinition(columns =>
            {
                columns.RelativeColumn();
                columns.RelativeColumn();
                columns.RelativeColumn();
                columns.RelativeColumn();
                columns.RelativeColumn();
            });

            // Header row
            table.Header(header =>
            {
                header.Cell().Element(CellStyle).Text("Product").Bold();
                header.Cell().Element(CellStyle).Text("Warehouse").Bold();
                header.Cell().Element(CellStyle).Text("Location").Bold();
                header.Cell().Element(CellStyle).Text("Stock").Bold();
                header.Cell().Element(CellStyle).Text("Unit").Bold();
            });

            // Data rows
            foreach (var item in tableData)
            {
                table.Cell().Element(CellStyle).Text(item.Name);
                table.Cell().Element(CellStyle).Text(item.Warehouse);
                table.Cell().Element(CellStyle).Text(item.Location);
                table.Cell().Element(CellStyle)
                    .Text(item.CurrentStock.ToString())
                    .FontColor(item.CurrentStock < 10 ? Colors.Red.Medium : Colors.Black);
                table.Cell().Element(CellStyle).Text(item.UnitOfMeasure);
            }
        });
    }

    void ComposeFooter(IContainer container)
    {
        container.AlignCenter().Text(x =>
        {
            x.Span("Page ");
            x.CurrentPageNumber();
            x.Span(" of ");
            x.TotalPages();
        });
    }

    IContainer CellStyle(IContainer container)
    {
        return container
            .BorderBottom(1)
            .BorderColor(Colors.Grey.Lighten2)
            .PaddingVertical(5)
            .PaddingHorizontal(5);
    }
}
```

## Final Thoughts
Creating reports with QuestPDF is straightforward and efficient, especially for cross-platform applications. While we give up a visual designer, the code-first approach with hot reload makes up for it, offering flexibility and speed.

I hope this helps you in your projects! Don’t forget to check out the QuestPDF documentation for more features and consider supporting the project on GitHub with a star. Feel free to leave your questions or thoughts below.

_Happy coding!_