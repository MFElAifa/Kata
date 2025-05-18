<?php 

namespace App\Controller;

use App\Service\FeedbackService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route("/api")]
class FeedbackController extends AbstractController
{
    #[Route('/feedback', name:"save_feedback", methods: ['POST'])]
    public function saveSurvey(Request $request, FeedbackService $feedbackService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $feedbackService->createFeedbackFromData($data);

        return $this->json(['status' => 'Feedback created'], 201);
    }

    #[Route('/feedbacks', name:"get_feedbacks", methods: ['GET'])]
    public function getFeedbacks(FeedbackService $feedbackService): JsonResponse
    {
        $data = $feedbackService->getFeedbacks();
        return $this->json($data);
    }
}