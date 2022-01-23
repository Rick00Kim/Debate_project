import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="debate-app-package-Rick00Kim",
    version="0.0.1",
    author="Rick00Kim",
    author_email="dreamx119@gmail.com",
    description="Flask Discuss web application",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/Rick00Kim/Debate_project",
    project_urls={
        "Bug Tracker": "https://github.com/Rick00Kim/Debate_project/issues",
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    packages=["app", "app.api"],
    python_requires=">=3.7",

)
