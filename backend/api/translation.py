from fastapi import APIRouter, HTTPException

from schemas.translation_schema import (
    TranslationRequest,
    TranslationResponse
)

from ai.translation import translate_text


router = APIRouter(
    prefix="/translation",
    tags=["AI Translation"]
)


@router.post("/", response_model=TranslationResponse)
def translation(request: TranslationRequest):

    try:

        translated_text = translate_text(
            request.text,
            request.target_language
        )

        return TranslationResponse(
            translated_text=translated_text
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )