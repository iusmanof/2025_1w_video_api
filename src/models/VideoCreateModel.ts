import {Resolutions} from "../index";

export type videoType = {
  id: number,
  title: string,
  author: string,
  canBeDownloaded: boolean,
  minAgeRestriction: number | null,
  createdAt: string,
  publicationDate: string,
  availableResolutions: Resolutions[],
}

export type VideoCreateModel = {
  title: string
  author: string
  availableResolutions: Resolutions[]
}

export type VideoUpdateModel = {
  title: string
  author: string
  availableResolutions: Resolutions[]
  canBeDownloaded: boolean,
  minAgeRestriction: number,
  publicationDate: string
}

export type ErrorMessage = {
  message: string
  field: string
}
