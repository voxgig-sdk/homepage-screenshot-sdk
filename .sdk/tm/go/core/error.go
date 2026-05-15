package core

type HomepageScreenshotError struct {
	IsHomepageScreenshotError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewHomepageScreenshotError(code string, msg string, ctx *Context) *HomepageScreenshotError {
	return &HomepageScreenshotError{
		IsHomepageScreenshotError: true,
		Sdk:              "HomepageScreenshot",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *HomepageScreenshotError) Error() string {
	return e.Msg
}
