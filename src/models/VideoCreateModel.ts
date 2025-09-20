import {Resolutions} from "../index";

export type VideoCreateModel = {
  title: string
  author: string
  availableResolutions: Resolutions[]
}
