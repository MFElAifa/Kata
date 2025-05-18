<?php 

namespace App\Controller;

use App\Service\SurveyService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route("/api")]
class SurveyController extends AbstractController
{
    #[Route("/questions", name: "get_questions", methods:["GET"])]
    public function getQuestions(SurveyService $surveyService): JsonResponse
    {
        $data = $surveyService->getAllQuestions();
        return $this->json($data);
    }

    #[Route('/survey', name:"save_survey", methods: ['POST'])]
    public function saveSurvey(Request $request, SurveyService $surveyService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $surveyService->createSurveyFromData($data);

        return $this->json(['status' => 'Survey created'], 201);
    }

    #[Route("/surveys", name: "get_surveys", methods:["GET"])]
    public function getSurveys(SurveyService $surveyService): JsonResponse
    {
        $data = $surveyService->getSurveys();
        return $this->json($data);
    }
}