---
title: "How to Deploy Your JavaFX Application (The easy way)"
date: "April 23, 2024"
image: "/blogs/javafx.png"
link: "/posts/HowToDeployYourJavaFXApplication"
techStack: ["Java", "JavaFX"]
tags: ["Desktop", "Deployment"]
layout: "@/layouts/post.astro"
---
# How to Deploy Your JavaFX Application (The easy way)

If you’re developing JavaFX applications using JDK version 9 or later, or if you’re new to the world of JavaFX packaging, you might face numerous challenges when trying to create a standalone .jar application. This post provides a straightforward guide to successfully package your JavaFX applications, with a focus on using IntelliJ IDEA.

## The Problem
IntelliJ IDEA has a dedicated artifact type for packaging JavaFX applications, but this is only effective with Java 8. For those using more recent versions, like Java 21, this feature is outdated. If you’ve encountered the error _“Error: JavaFX Packager: Can’t build artifact — fx:deploy is not available in this JDK”_ when using this method, do not worry. It doesn’t mean you can’t package your application; rather, you’ll need to consider a third-party solution.

IntelliJ’s official guide suggests third-party tools for packaging, which can seem overwhelming if you’re new to this. However, the process can be simplified without the need for complex tools or code.

## Create a Launch Class
In a typical JavaFX project, the ‘Main’ class, which serves as the program’s entry point, extends ```javafx.application.Application```. However, this configuration can lead to complications because the entry point is directly tied to JavaFX's application lifecycle, which isn't always compatible with how standalone .jar files are executed. To sidestep these potential issues, it’s advisable to separate the entry point from the JavaFX-specific code. You can achieve this by creating an independent launch class that doesn’t extend ```javafx.application.Application``` but instead calls it. This separation makes your application more flexible and easier to package. Here's how you can set up such a launch class:
```java
public class Launcher {
    public static void main(String[] args) {
        Application.launch(Main.class, args);
    }
}

```

This ```Launcher``` class acts simply as a straightforward entry point, initiating the JavaFX application by calling ```Application.launch```. With this setup, the JVM can initiate the ```Launcher``` without the direct JavaFX extension constraints, facilitating a smoother startup and packaging process.


## Configure the Artifact
Navigate to the project structure in IntelliJ IDEA, and adjust the project settings to configure a new artifact. Choose to add a new JAR “from modules with dependencies…” and select the “Launcher” class you created as the Main Class. Apply the changes and build the artifact as usual.

At this point, you’ve successfully created your .jar file and overcome the primary challenges associated with packaging JavaFX applications. You can find a visual guide to this process on the YouTube channel Codeflu
<iframe width="560" height="315" src="https://www.youtube.com/embed/kQaE2HlFeWY?si=PbbTlMpChPfSKl5D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Additional Issues
After packaging, you might encounter further issues:

**‘Exception in thread “main” java.lang.SecurityException: Invalid signature file digest for Manifest main attributes’**: This error typically occurs when the .jar file contains signature files that do not match the contents of the .jar after it has been modified. These signature files (```*.SF```, ```*.RSA```, ```*.DSA```) are used to verify the integrity and authenticity of the jar contents, but if the contents change after these files are created, the verification fails, leading to this error.

To resolve this issue, you need to remove these signature files from the .jar, essentially ‘unsigining’ the jar. This can be done using a zip utility since .jar files are structured as zip files. Here’s the command you can run:

```bash
zip -d yourjar.jar 'META-INF/*.SF' 'META-INF/*.RSA' 'META-INF/*.DSA'
```
This command targets the .jar file and specifically deletes the signature-related files within the ```META-INF``` directory. By doing this, you prevent the Java runtime from attempting to verify these files against the jar contents, thus bypassing the security exception.

For a more detailed discussion and alternative solutions, you might want to check the relevant conversation on [Stack Overflow](https://stackoverflow.com/questions/999489/invalid-signature-file-when-attempting-to-run-a-jar). This thread can provide additional insights into why these issues occur and how others have resolved them.

**‘JavaFX WARNING: Unsupported JavaFX configuration: classes were loaded from ‘unnamed module @…’**: This problem often arises with JDKs like OpenJDK from Java 11 onwards, where Oracle opted to make the JDK modular and no longer includes JavaFX by default. This modularization was part of an effort to streamline the JDK and allow developers to include only the modules they need, which helps to reduce the footprint of applications.

However, this change means that if your application depends on JavaFX, you need to ensure it’s included in your project setup. One straightforward solution is to use a JDK that already includes JavaFX. [BellSoft’s Liberica](https://bell-sw.com/pages/downloads/#jdk-21-lts) JDK is an excellent example of such a JDK. It is based on OpenJDK but includes additional components like JavaFX. This is particularly convenient because it saves you from having to manually manage JavaFX modules. When downloading Liberica JDK, make sure to select the ‘Full JDK’ option, which includes JavaFX among other things.

Another alternative is to use Azul’s Zulu JDK, which also allows the inclusion of JavaFX modules, or to configure your project with jlink. Jlink is a tool that lets you assemble and optimize a set of modules (and their dependencies) to create a custom runtime image containing only the modules you need. For JavaFX, you can use jlink to bundle the necessary JavaFX modules with your application, ensuring that JavaFX is available when your application runs.

To ensure your JavaFX application runs smoothly with recent modular JDK versions, such as OpenJDK 11 or later, it’s crucial to include JavaFX in your project setup. A convenient solution is to download BellSoft’s Liberica JDK, selecting the ‘Full JDK’ option which integrates JavaFX. Simply install this JDK and use it to run your program, which will automatically include the necessary JavaFX components, bypassing the ‘Unsupported JavaFX configuration’ warning. This approach eliminates the need to manually manage JavaFX modules, simplifying your development process.

For a more comprehensive explanation of how to handle JavaFX configuration issues, especially in modular JDK environments, check the discussions on [Stack Overflow](https://stackoverflow.com/questions/67854139/javafx-warning-unsupported-javafx-configuration-classes-were-loaded-from-unna).


I hope this guide helps you avoid and resolve any issues when running your JavaFX applications, making the process less confusing and frustrating, especially for newcomers (and even experts!).